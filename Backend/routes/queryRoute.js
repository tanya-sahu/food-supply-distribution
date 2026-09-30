const express = require('express');
const router = express.Router();

// Destructure exact function names
const { handleAIQuery, handleDirectQuery } = require('../controllers/queryController');

// Debug check (Console me print karke dekhe ki undefined toh nahi hai)
if (!handleAIQuery || !handleDirectQuery) {
  console.error("⚠ Controller functions loading error! Check queryController.js exports.");
}

router.post('/ai-query', handleAIQuery);
router.post('/direct-query', handleDirectQuery);

module.exports = router;