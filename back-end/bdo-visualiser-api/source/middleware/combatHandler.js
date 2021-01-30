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
    var totalsDay = sqlContext.getTotalsDay(globalUserId);
    // Week
    var totalsWeek = sqlContext.getTotalsWeek(globalUserId);
    // Month
    var totalsMonth = sqlContext.getTotalsMonth(globalUserId);
    // Year
    var totalsYear = sqlContext.getTotalsYear(globalUserId);
    // Total
    var total = sqlContext.getTotals(globalUserId);

    return res.json({totalsDay, totalsWeek, totalsMonth, totalsYear, total});
}