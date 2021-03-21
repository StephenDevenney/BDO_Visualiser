var express = require('express');
var router = express.Router();
var combatPath = require('../middleware/combatHandler');

// // GET

router.get('/grinding-data', (req, res) => { return combatPath.getGrindingData(res) });

router.get('/column-defaults', (req, res) => { return combatPath.getColumnDefaults(res) });

router.get('/totals', (req, res) => { return combatPath.getTotals(res) });

router.get('/trashLoot-totals/:locationId', (req, res) => { return combatPath.getTrashLootTotals(req.params.locationId, res) });

// // PUT
router.put('/active-columns', (req, res) => { return res.json(combatPath.updateActiveColumns(req.body, res)) });

module.exports = router;
