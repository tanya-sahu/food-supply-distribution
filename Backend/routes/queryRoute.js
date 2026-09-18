const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { generateSQLFromText } = require('../services/geminiServices.js');

router.post('/ai-query', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const generatedSQL = await generateSQLFromText(prompt);
        const [rows] = await db.query(generatedSQL);

        res.json({
            success: true,
            prompt,
            sql: generatedSQL,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;