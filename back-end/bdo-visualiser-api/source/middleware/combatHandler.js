const sqlContext = require("../sqlContext/combatContext");
var globalUserId = "1";

// // GET
exports.getGrindingData = function(res) {
    var tableHeaders = sqlContext.getCombatTableHeaders();
    var tableData = sqlContext.getGrindingData(globalUserId);

    return res.json({tableHeaders, tableData});
}

exports.getColumnDefaults = function(res) {
    var settings = sqlContext.getCombatSettingsId(globalUserId);
    return res.json(sqlContext.getColumnDefaults(settings.combatSettingsId));
}

exports.getTotals = function(res) {
    // Day

    // Week

    // Month

    // Year

    // Total

    return res.json(sqlContext.getTotals(globalUserId));
}