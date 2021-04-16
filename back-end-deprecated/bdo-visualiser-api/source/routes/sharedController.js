var express = require('express');
var router = express.Router();
var sharedPath = require('../middleware/sharedHandler');

// // GET
router.get('/locations', (req, res) => { return sharedPath.getLocations(res) });

// // POST
router.post('/data-upload/:origin', (req, res) => { return sharedPath.dataUpload(req.params.origin, req.body, res) });

module.exports = router;
