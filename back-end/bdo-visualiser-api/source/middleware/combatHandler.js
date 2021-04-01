const sqlContext = require("../sqlContext/combatContext");
const CombatHeaders = require("../../shared/converts/combatHeaders");
const UserClass = require("../../shared/converts/userClass");
const Gear = require("../../shared/converts/gear");
const Calc = require("../../shared/calc/gearScore");
const NewEntry = require("../../shared/converts/combatTableEntry");
const VisibleTableData = require("../../shared/converts/visibleCombatTableData");
const Server = require("../../shared/converts/server");
const LocationGroups = require("../../shared/converts/locationGroups");
const csv = require('csv-parser');
var globalUserId = "1";

// // GET
exports.getGrindingData = async function(res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    var hasDefaultCombatHeaders = true;
    if(combatSettings.hasDefaultCombatHeaders == 0)
        hasDefaultCombatHeaders = false;
    // Get Table Headers
    var tableHeadersEntites = sqlContext.getCombatTableHeaders(combatSettings.combatSettingsId);
    var tableHeaders = [];
    await Promise.all(tableHeadersEntites.map(async (col) => {
        var headerVM = CombatHeaders.convertToVM(col);
        tableHeaders.push(headerVM);
    }));
    // Get Active Classes
    var activeClassesEntities = sqlContext.getActiveClasses(combatSettings.combatSettingsId);
    var activeClasses = [];
    await Promise.all(activeClassesEntities.map(async (userClassEntity) => {
        var gearEntity = await sqlContext.getClassGear(userClassEntity.FK_gearScoreId);
        var activeClassVM = UserClass.convertEntitiesToViewModel(userClassEntity, gearEntity);
        activeClasses.push(activeClassVM);
    }));
    // Get Grinding Data
    var tableDataEntity = sqlContext.getGrindingData(globalUserId);
    var tableData = [];
    var visibleData = [];
    await Promise.all(tableDataEntity.map(async (entry) => {
        var returnEntry = NewEntry.convertToViewModel(entry);
        tableData.push(returnEntry);
        var visibleEntry = VisibleTableData.convertToViewModel(returnEntry);
        visibleData.push(visibleEntry);
    }));

    var hasMainClass = true;
    if(activeClasses.length == 0 || !activeClasses)
        hasMainClass = false;

    return res.json({tableHeaders, tableData, visibleData, hasDefaultCombatHeaders, activeClasses, hasMainClass});
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
    return res.json(sqlContext.getClassNameEnums());
}

exports.getCombatEnums = async function(res){
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    var classNamesEnum = sqlContext.getClassNameEnums();
    var territories = sqlContext.getTerritoryEnums();
    var locationNamesEnum = [];
    var recentEntries = sqlContext.recentEntries(combatSettings.combatSettingsId);
    // Get Most Recent Locations First
    if(typeof(recentEntries) != "undefined" || recentEntries.length > 0) {
        locGroupVM = await LocationGroups.convertRecentToVM(combatSettings.combatSettingsId); 
        locationNamesEnum.push(locGroupVM);
    }
    
    await Promise.all(territories.map(async (ter) => {
        locGroupVM = await LocationGroups.convertToVM(ter); 
        locationNamesEnum.push(locGroupVM);
    }));
    var serversEnum = sqlContext.getServerEnums();
    var combatTypesEnum = sqlContext.getCombatTypeEnums();
    var timeAmountEnum = sqlContext.getTimeEnums();
    var serverNamesEnum = [];
    await Promise.all(serversEnum.map(async (serverEntity) => {
        serverVM = Server.convertToViewModel(serverEntity); 
        serverNamesEnum.push(serverVM);
    }));
    return res.json({classNamesEnum, locationNamesEnum, serverNamesEnum, combatTypesEnum, timeAmountEnum});
}

// // PUT
exports.updateActiveColumns = async function(columnHeaders, res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    await Promise.all(columnHeaders.map(async (col) => {
        var headerEntity = CombatHeaders.convertToEntity(col);
        sqlContext.updateActiveColumns(combatSettings.combatSettingsId, headerEntity.headingId, headerEntity.isActive);
    }));
    
    sqlContext.updateHasDefaultCombatHeadersSet(combatSettings.combatSettingsId, 1);
    var tableHeadersObj = sqlContext.getCombatTableHeaders(combatSettings.combatSettingsId);
    var tableHeaderViewModels = [];
    await Promise.all(tableHeadersObj.map(async (col) => {
        headerVM = CombatHeaders.convertToVM(col);
        tableHeaderViewModels.push(headerVM);
    }));
    return res.json(tableHeaderViewModels);
}

exports.updateClass = function(classToUpdate, res) {

}

exports.updateVisibleColumn = function(column, res) {
    if(column.isActive)
        column.isActive = false;
    else if(!column.isActive)
        column.isActive = true;

    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    var headerEntity = CombatHeaders.convertToEntity(column);
    sqlContext.updateActiveColumns(combatSettings.combatSettingsId, headerEntity.headingId, headerEntity.isActive);
    var headerVM = CombatHeaders.convertToVM(headerEntity);
    return res.json(headerVM);
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
    var gearEntity = Gear.convertToEntity(newClass.gear, classEntity, classIdObj.classId);
    gearEntity = Calc.calcGearScore(gearEntity);
    var gearScoreIdObj = sqlContext.createGearScore(gearEntity);
    sqlContext.updateClassWithGearScoreId(gearScoreIdObj.gearScoreId, classEntity.FK_combatSettingsId, classIdObj);
    gearEntity = Gear.reConvertToEntity(gearEntity, gearScoreIdObj.gearScoreId);
    var classVM = UserClass.convertToViewModel(classEntity, gearEntity, classIdObj.classId);
    return res.json(classVM);
}

exports.createEntry = async function(newEntry, res) {
    var combatSettings = await sqlContext.getCombatSettings(globalUserId);
    var newEntryEntity = NewEntry.convertToEntity(newEntry, combatSettings.combatSettingsId);
    var returnEntity = await sqlContext.createGrindingEntry(newEntryEntity);
    var grindingTableEntry = NewEntry.reConvertToViewModel(returnEntity, newEntry);
    var visibleData = VisibleTableData.convertToViewModel(grindingTableEntry);
    return res.json({grindingTableEntry, visibleData}); 
}

exports.dataUpload = async function(uploadedFiles, res) {
    var combatSettings = sqlContext.getCombatSettings(globalUserId);
    var newEntry = [];
    await Promise.all(uploadedFiles.map(async (file) => {
        if(file) {
            if(parseInt(file.grindingId) > 0){
                var insertEntry = await VisibleTableData.convertImportToEntity(file, combatSettings.combatSettingsId);
                newEntry.push(insertEntry);
            }
        }
    }));

    // var tableDataEntity = await sqlContext.getGrindingData(globalUserId);
    // var tableData = [];
    // var visibleData = [];
    // await Promise.all(tableDataEntity.map(async (entry) => {
    //     var returnEntry = NewEntry.convertToViewModel(entry);
    //     tableData.push(returnEntry);
    //     var visibleEntry = VisibleTableData.convertToViewModel(returnEntry);
    //     visibleData.push(visibleEntry);
    // }));

    return res.json(uploadedFiles);
}