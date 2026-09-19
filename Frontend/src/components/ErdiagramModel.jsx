import React from 'react';

export default function ERDiagramModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff', padding: '25px', borderRadius: '10px',
                maxWidth: '850px', width: '90%', maxHeight: '90vh', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>Database Schema & Entity Relationship Diagram</h3>
                    <button 
                        onClick={onClose}
                        style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}
                    >
                        Close
                    </button>
                </div>

                {/* Database Schema Map */}
                <div style={{ fontFamily: 'monospace', backgroundColor: '#282c34', color: '#abb2bf', padding: '15px', borderRadius: '6px', fontSize: '13px' }}>
                    <pre>{`
  +------------------+         +-------------------+
  |    Suppliers     |         |    Warehouses     |
  +------------------+         +-------------------+
  | supplier_id (PK) |         | warehouse_id (PK) |
  | name, contact    |         | name, location    |
  +--------+---------+         +--------+----------+
           | 1                          | 1
           | N                          | N
  +--------v---------+         +--------v----------+        +-------------------+
  |     Products     |         |     Inventory     |        |   Relief Camps    |
  +------------------+         +-------------------+        +-------------------+
  | product_id (PK)  |<--------| inventory_id (PK) |        | camp_id (PK)      |
  | supplier_id (FK) | 1     N | warehouse_id (FK) |        | camp_name, status |
  +------------------+         +-------------------+        +---------+---------+
                                        | 1                           | 1
                                        |                             |
                                        | N                           | N
                               +--------v-----------------------------v-----+
                               |                 Shipments                  |
                               +--------------------------------------------+
                               | shipment_id (PK)                           |
                               | warehouse_id (FK), camp_id (FK), status    |
                               +--------------------------------------------+
                    `}</pre>
                </div>

                <div style={{ marginTop: '15px', fontSize: '14px', color: '#555' }}>
                    <strong>Tables Included:</strong>
                    <ul>
                        <li><code>Suppliers</code> ➔ <code>Products</code> (1 to Many)</li>
                        <li><code>Warehouses</code> ➔ <code>Inventory</code> (1 to Many)</li>
                        <li><code>Products</code> ➔ <code>Inventory</code> (1 to Many)</li>
                        <li><code>Warehouses</code> & <code>ReliefCamps</code> ➔ <code>Shipments</code> (1 to Many)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}