const sqlContext = require("../sqlContext/combatContext");
var globalUserId = "1";

// // GET
exports.getGrindingData = function(res) {
    var settings = sqlContext.getCombatSettingsId(globalUserId);
    var tableHeaders = sqlContext.getCombatTableHeaders(settings.combatSettingsId);
    tableHeaders.forEach(col => {
        if(col.isActive == 1)
            col.isActive = true;
        else if(col.isActive == 0)
            col.isActive = false;
    });
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

exports.getMainClass = function(locationId, res) {
    var settings = sqlContext.getCombatSettingsId(globalUserId);

    var classDetails = sqlContext.getMainClass(settings.combatSettingsId);
    if(classDetails.classId > 0) {
        var classId = classDetails.classId;
        var className = classDetails.className;
        var classRole = classDetails.classRole;
        var gear = sqlContext.getClassGear(classDetails.gearScoreId);

        return res.json({classId, className, classRole, gear});
    } 
    else
        return;
}

// // PUT
exports.updateActiveColumns = function(columnHeaders, res) {
    var settings = sqlContext.getCombatSettingsId(globalUserId);
    columnHeaders.forEach(col => {
        if(col.isActive == true)
            col.isActive = 1;
        else if(col.isActive == false)
            col.isActive = 0;
        sqlContext.updateActiveColumns(settings.combatSettingsId, col.headingId, col.isActive);
    });

    // return res.json(sqlContext.getCombatTableHeaders(settings.combatSettingsId));
}