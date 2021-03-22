const sqlContext = require("../sqlContext/combatContext");
const CombatHeaders = require("../../shared/converts/combatHeaders");
const UserClass = require("../../shared/converts/userClass");
const Gear = require("../../shared/converts/gear");
const Calc = require("../../shared/calc/gearScore");
var globalUserId = "1";

// // GET
exports.getGrindingData = function(res) {
    var settings = sqlContext.getCombatSettingsId(globalUserId);
    var tableHeaders = sqlContext.getCombatTableHeaders(settings.combatSettingsId);
    var i = 0;
    tableHeaders.forEach(col => {
        tableHeaders[i] = new CombatHeaders.convertToVM(col.headingId, col.field, col.header, col.isActive);
        i++;
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

exports.getMainClass = function(res) {
    var settings = sqlContext.getCombatSettingsId(globalUserId);
    var classEntity = sqlContext.getMainClass(settings.combatSettingsId);
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
    var settings = sqlContext.getCombatSettingsId(globalUserId);
    columnHeaders.forEach(col => {
        var dbCol = new CombatHeaders.convertToEntity(col.headingId, col.field, col.header, col.isActive);
        sqlContext.updateActiveColumns(settings.combatSettingsId, dbCol.headingId, dbCol.isActive);
    });
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
    var settings = sqlContext.getCombatSettingsId(globalUserId);

    if(!newClass.className)
        return res.status(400).json({ msg: `Class Name Required.` });
    else if(!newClass.classRole)
        return res.status(400).json({ msg: `Class Role Required.` });

    var classNames = sqlContext.getAllClassNames();
    var classRoles = sqlContext.getAllClassRoles();
    var classEntity = UserClass.convertToEntity(newClass, classRoles, classNames, settings.combatSettingsId);
    var classIdObj = sqlContext.createClass(classEntity);
    var gearEntity = Gear.convertToEntity(newClass, classEntity, classIdObj);
    gearEntity = Calc.calcGearScore(gearEntity);
    var gearScoreIdObj = sqlContext.createGearScore(gearEntity);
    sqlContext.updateClassWithGearScoreId(gearScoreIdObj.gearScoreId, classEntity.FK_combatSettingsId);
    var classVM = UserClass.convertToViewModel(classEntity, gearEntity, classRoles, classNames);
    return res.json(classVM);
}