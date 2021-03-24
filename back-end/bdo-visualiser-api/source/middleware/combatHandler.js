const sqlContext = require("../sqlContext/combatContext");
const CombatHeaders = require("../../shared/converts/combatHeaders");
const UserClass = require("../../shared/converts/userClass");
const Gear = require("../../shared/converts/gear");
const Calc = require("../../shared/calc/gearScore");
var globalUserId = "1";

// // GET
exports.getGrindingData = async function(res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    var hasDefaultCombatHeaders = true;
    if(combatSettings.hasDefaultCombatHeaders == 0)
        hasDefaultCombatHeaders = false;
    // Get Table Headers
    var tableHeaders = sqlContext.getCombatTableHeaders(combatSettings.combatSettingsId);
    var i = 0;
    tableHeaders.forEach(col => {
        tableHeaders[i] = new CombatHeaders.convertToVM(col.headingId, col.field, col.header, col.isActive);
        i++;
    });
    // Get Grinding Data
    var tableData = sqlContext.getGrindingData(globalUserId);

    // Get Active Classes
    var activeClassesEntities = sqlContext.getActiveClasses(combatSettings.combatSettingsId);
    var activeClasses = [];
    var i = 0;
    await activeClassesEntities.forEach(async userClassEntity => {
        var gearEntity = await sqlContext.getClassGear(userClassEntity.FK_gearScoreId);
        var activeClassVM = UserClass.convertEntitiesToViewModel(userClassEntity, gearEntity);
        activeClasses.push(activeClassVM);
    });

    var hasMainClass = false;
    if(activeClasses.length > 0)
        hasMainClass = true;

    return res.json({tableHeaders, tableData, hasDefaultCombatHeaders, activeClasses, hasMainClass});
}

exports.getColumnDefaults = function(res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    return res.json(sqlContext.getColumnDefaults(combatSettings.combatSettingsId));
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

exports.getMainClass = function(res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    var classEntity = sqlContext.getMainClass(combatSettings.combatSettingsId);
    if(classEntity) {
        var className = classEntity.className;
        var classRole = classEntity.classRole;
        var gear = sqlContext.getClassGear(classEntity.gearScoreId);
        return res.json({className, classRole, gear});
    } 
    else
        return res.json();
}

exports.getAllClassNames = function(res) {
    return res.json(sqlContext.getAllClassNames());
}

// // PUT
exports.updateActiveColumns = function(columnHeaders, res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    columnHeaders.forEach(col => {
        var dbCol = new CombatHeaders.convertToEntity(col.headingId, col.field, col.header, col.isActive);
        sqlContext.updateActiveColumns(combatSettings.combatSettingsId, dbCol.headingId, dbCol.isActive);
    });
    var settingsCombatHeadersSet = sqlContext.updateHasDefaultCombatHeadersSet(combatSettings.combatSettingsId, 1);
    if(settingsCombatHeadersSet.hasDefaultCombatHeaders == 1)
        return true;
    else 
        return false;
}

exports.updateClass = function(classToUpdate, res) {

}

// // POST
exports.createMainClass = function(newClass, res) {
    // Set Role
    newClass.classRole = "Main";
    module.exports.createClass(newClass, res);
}

exports.createClass = function(newClass, res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);

    if(!newClass.className)
        return res.status(400).json({ msg: `Class Name Required.` });
    else if(!newClass.classRole)
        return res.status(400).json({ msg: `Class Role Required.` });

    var classEntity = UserClass.convertToEntity(newClass, combatSettings.combatSettingsId);
    var classIdObj = sqlContext.createClass(classEntity);
    var gearEntity = Gear.convertToEntity(newClass, classEntity, classIdObj);
    gearEntity = Calc.calcGearScore(gearEntity);
    var gearScoreIdObj = sqlContext.createGearScore(gearEntity);
    sqlContext.updateClassWithGearScoreId(gearScoreIdObj.gearScoreId, classEntity.FK_combatSettingsId, classIdObj);
    var classVM = UserClass.convertToViewModel(classEntity, gearEntity);
    return res.json(classVM);
}