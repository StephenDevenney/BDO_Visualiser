var express = require('express');
var router = express.Router();
var combatPath = require('../middleware/combatHandler');

// // GET
router.get('/grinding-data', (req, res) => { return combatPath.getGrindingData(res) });

router.get('/column-defaults', (req, res) => { return combatPath.getColumnDefaults(res) });

router.get('/totals', (req, res) => { return combatPath.getTotals(res) });

router.get('/main-class', (req, res) => { return combatPath.getMainClass(res) });

router.get('/class-names', (req, res) => { return combatPath.getAllClassNames(res) });

router.get('/trashLoot-totals/:locationId', (req, res) => { return combatPath.getTrashLootTotals(req.params.locationId, res) });

router.get('/enums', (req, res) => { return combatPath.getCombatEnums(res) });

// // PUT
router.put('/active-columns', (req, res) => { return combatPath.updateActiveColumns(req.body, res) });

router.put('/visible-column', (req, res) => { return combatPath.updateVisibleColumn(req.body, res) });

router.put('/update-class', (req, res) => { return combatPath.updateClass(req.body, res) })

// // POST
router.post('/create-main-class', (req, res) => { return combatPath.createMainClass(req.body, res) });

router.post('/create-class', (req, res) => { return combatPath.createClass(req.body, res) });

router.post('/new-entry', (req, res) => { return combatPath.createEntry(req.body, res) });

module.exports = router;
