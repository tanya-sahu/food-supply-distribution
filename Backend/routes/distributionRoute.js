const express = require('express');
const router = express.Router();
const { executeDistributionTransaction } = require('../controllers/distributionController');

// POST /api/pipeline/execute-distribution
router.post('/pipeline/execute-distribution', executeDistributionTransaction);

module.exports = router;