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

exports.getTrashLootTotals = function(locationId, res) {
    // Day
    var trashLootDay = sqlContext.getTrashLootDay(locationId, globalUserId);
    // Week
    var trashLootWeek = sqlContext.getTrashLootWeek(locationId, globalUserId);
    // Month
    var trashLootMonth = sqlContext.getTrashLootMonth(locationId, globalUserId);
    // Year
    var trashLootYear = sqlContext.getTrashLootYear(locationId, globalUserId);
    // Total
    var trashLootTotal = sqlContext.getTrashLootTotal(locationId, globalUserId);

    return res.json({trashLootDay, trashLootWeek, trashLootMonth, trashLootYear, trashLootTotal});
}