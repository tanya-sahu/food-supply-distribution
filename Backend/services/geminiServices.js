const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an expert MySQL Data Analyst for a Food Supply & Distribution System.
Convert the user's natural language question into a valid, executable SQL query.

DATABASE SCHEMA:
1. Suppliers (supplier_id PK, name, contact_person, phone, email, location, created_at)
2. Products (product_id PK, name, category, unit, supplier_id FK)
3. Warehouses (warehouse_id PK, name, location, capacity_sqft, manager_name)
4. Inventory (inventory_id PK, warehouse_id FK, product_id FK, quantity, min_threshold, last_updated)
5. ReliefCamps (camp_id PK, camp_name, location, affected_people_count, urgency_level ENUM('Low','Medium','High','Critical'), officer_in_charge)
6. Shipments (shipment_id PK, warehouse_id FK, camp_id FK, dispatch_date, status ENUM('Pending','In Transit','Delivered','Cancelled'))

RULES:
- Return ONLY clean raw SQL without any markdown formatting or backticks.
- Write ONLY SELECT statements for data safety.
- Use JOINs when querying across multiple tables.
`;

async function generateSQLFromText(userPrompt) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}`,
        });

        let sqlQuery = response.text.trim();
        sqlQuery = sqlQuery.replace(/```sql/g, '').replace(/```/g, '').trim();
        return sqlQuery;
    } catch (error) {
        console.error('Error generating SQL:', error);
        throw error;
    }
}

module.exports = { generateSQLFromText };