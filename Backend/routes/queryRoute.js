const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { generateSQLFromText } = require("../services/geminiServices");

// Mode 1: Natural English (AI via Gemini)
router.post("/ai-query", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const generatedSQL = await generateSQLFromText(prompt);
    // MySQL2 promise wrapper uses destructuring for results
    const [rows] = await db.query(generatedSQL);
    res.json({ success: true, prompt, sql: generatedSQL, data: rows });
  } catch (error) {
    console.error("AI Query Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.sqlMessage || error.message || String(error) 
    });
  }
});

// Mode 2: Direct SQL Query
router.post("/direct-query", async (req, res) => {
  const { sql } = req.body;
  if (!sql || !sql.trim())
    return res.status(400).json({ error: "SQL query is required" });

  if (!sql.trim().toUpperCase().startsWith("SELECT")) {
    return res.status(400).json({ error: "Only SELECT queries are allowed." });
  }

  try {
    const [rows] = await db.query(sql);
    res.json({ success: true, sql, data: rows });
  } catch (error) {
    console.error("FULL DB ERROR OBJECT:", error);
    res.status(500).json({
      success: false,
      error: error.sqlMessage || error.message || String(error),
    });
  }
});

module.exports = router;