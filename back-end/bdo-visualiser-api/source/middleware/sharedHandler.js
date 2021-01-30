const sqlContext = require("../sqlContext/sharedContext");
var globalUserId = "1";

// // GET
exports.getLocations = function(res) {
    return res.json(sqlContext.getLocations());
}