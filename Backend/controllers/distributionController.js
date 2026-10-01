const db = require('../config/db');

/**
 * Real-World ACID Transaction Distribution Process
 */
exports.executeDistributionTransaction = async (req, res) => {
  const { targetLocation, requestedQty } = req.body;

  // Validation
  if (!targetLocation || !requestedQty || requestedQty <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Input! Please provide a valid Target City and Quantity.'
    });
  }

  let connection;
  try {
    // Dedicated Connection for Transaction
    connection = await db.getConnection();

    // 🚦 STEP 1: BEGIN TRANSACTION
    await connection.beginTransaction();

    // 🔍 STEP 2: INVENTORY CHECK (Row Lock with FOR UPDATE)
    const [inventoryRows] = await connection.query(
      `SELECT i.inventory_id, i.warehouse_id, i.product_id, i.quantity, w.name as warehouse_name, p.name as product_name
       FROM Inventory i
       JOIN Warehouses w ON i.warehouse_id = w.warehouse_id
       JOIN Products p ON i.product_id = p.product_id
       WHERE i.quantity >= ? 
       ORDER BY i.quantity DESC 
       LIMIT 1 FOR UPDATE`,
      [requestedQty]
    );

    // ❌ FAILSAFE: Stock Kam Hone Par TRANSACTION ROLLBACK
    if (inventoryRows.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        success: false,
        error: `❌ TRANSACTION ROLLED BACK! Stock Check Failed: Insufficient inventory across all warehouses for ${requestedQty} units.`
      });
    }

    const selectedStock = inventoryRows[0];

    // 🔒 STEP 3: DEDUCTION & LOCK (Deduct stock from Inventory)
    await connection.query(
      `UPDATE Inventory 
       SET quantity = quantity - ? 
       WHERE inventory_id = ?`,
      [requestedQty, selectedStock.inventory_id]
    );

    // 📍 STEP 4: FIND / CREATE TARGET CAMP
    let [campRows] = await connection.query(
      `SELECT camp_id FROM ReliefCamps WHERE camp_name LIKE ? OR location LIKE ? LIMIT 1`,
      [`%${targetLocation}%`, `%${targetLocation}%`]
    );

    let targetCampId;
    if (campRows.length > 0) {
      targetCampId = campRows[0].camp_id;
    } else {
      // Automatic Camp Insertion if Location is new
      const [newCamp] = await connection.query(
        `INSERT INTO ReliefCamps (camp_name, location, affected_people_count, urgency_level) 
         VALUES (?, ?, 500, 'High')`,
        [`${targetLocation} Relief Camp`, targetLocation]
      );
      targetCampId = newCamp.insertId;
    }

    // 🚚 STEP 5: SHIPMENT CREATION & DISPATCH
    const [shipmentResult] = await connection.query(
      `INSERT INTO Shipments (warehouse_id, camp_id, dispatch_date, status)
       VALUES (?, ?, NOW(), 'In Transit')`,
      [selectedStock.warehouse_id, targetCampId]
    );

    const shipmentId = shipmentResult.insertId;

    // 📦 STEP 6: DELIVERY HANDOVER VERIFICATION
    await connection.query(
      `UPDATE Shipments SET status = 'Delivered' WHERE shipment_id = ?`,
      [shipmentId]
    );

    // ✅ STEP 7: COMMIT TRANSACTION
    await connection.commit();
    connection.release();

    // SQL Execution Log for UI Display
    const sqlLog = `
-- TRANSACTION EXECUTED FOR CITY: ${targetLocation.toUpperCase()} --
1. START TRANSACTION;
2. SELECT * FROM Inventory WHERE quantity >= ${requestedQty} FOR UPDATE;
3. UPDATE Inventory SET quantity = quantity - ${requestedQty} WHERE inventory_id = ${selectedStock.inventory_id};
4. INSERT INTO Shipments (warehouse_id=${selectedStock.warehouse_id}, camp_id=${targetCampId}, status='In Transit');
5. UPDATE Shipments SET status = 'Delivered' WHERE shipment_id = ${shipmentId};
6. COMMIT;
    `.trim();

    return res.json({
      success: true,
      message: `✅ Supply successfully dispatched & delivered to ${targetLocation}!`,
      sql: sqlLog,
      data: [
        {
          Transaction_Status: 'COMMITTED ✅',
          Target_City: targetLocation,
          Warehouse_Source: selectedStock.warehouse_name,
          Food_Item: selectedStock.product_name,
          Deducted_Qty: requestedQty,
          Remaining_Warehouse_Stock: selectedStock.quantity - requestedQty,
          Shipment_ID: `#SHP-${shipmentId}`,
          Delivery_Status: 'Delivered'
        }
      ]
    });

  } catch (error) {
    // ❌ FAILSAFE: Database Error Par Full Rollback
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error("Distribution Error:", error);
    return res.status(500).json({
      success: false,
      error: `❌ TRANSACTION ROLLED BACK Due to System Error: ${error.message}`
    });
  }
};