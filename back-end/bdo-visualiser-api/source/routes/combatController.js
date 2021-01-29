var express = require('express');
var router = express.Router();
var combatPath = require('../middleware/combatHandler');

// // GET

router.get('/grinding-data', (req, res) => { return combatPath.getGrindingData(res) });

router.get('/column-defaults', (req, res) => { return combatPath.getColumnDefaults(res) });

router.get('/totals', (req, res) => { return combatPath.getTotals(res) });

module.exports = router;
