var express = require('express');
var router = express.Router();
var sharedPath = require('../middleware/sharedHandler');

// // GET

router.get('/locations', (req, res) => { return sharedPath.getLocations(res) });

module.exports = router;
