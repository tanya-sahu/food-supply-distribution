const db = require('../config/db');
const { generateSQLFromPrompt } = require('../services/geminiServices');

// 1. AI Query Handler
const handleAIQuery = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ success: false, error: 'Prompt is required.' });
  }

  try {
    const sqlQuery = await generateSQLFromPrompt(prompt);
    const [rows] = await db.query(sqlQuery);
    return res.json({ success: true, sql: sqlQuery, data: rows });
  } catch (error) {
    console.error("AI Route Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Direct SQL Handler
const handleDirectQuery = async (req, res) => {
  const { sql } = req.body;
  if (!sql || !sql.trim()) {
    return res.status(400).json({ success: false, error: 'SQL string is required.' });
  }

  try {
    const [rows] = await db.query(sql);
    return res.json({ success: true, sql: sql, data: rows });
  } catch (error) {
    console.error("Direct SQL Error:", error);
    return res.status(400).json({ success: false, error: error.sqlMessage || error.message });
  }
};

// ⚠️ Explicitly export both functions
module.exports = {
  handleAIQuery,
  handleDirectQuery
};