require('dotenv').config();
const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });

// Get
exports.getGrindingData = function(userId) {
    return db.prepare("SELECT * FROM combat_grinding INNER JOIN security_settings ON security_settings.FK_combatSettingsId = combat_grinding.FK_combatSettingsId WHERE security_settings.FK_userId = ? ORDER BY grindingId DESC").all(userId);
}

exports.getTableEntryDetails = function(grindingId) {
    return db.prepare("SELECT enum_locations.locationName, enum_territory.territoryId, enum_territory.territoryName, enum_time.timeAmount, enum_class.className, enum_classRole.roleDescription AS classRole, combat_gearScore.ap, combat_gearScore.aap, combat_gearScore.dp, combat_gearScore.gearScore, enum_server.serverName AS serverDescription, enum_server.isElviaRealm, combatType.combatTypeName AS combatTypeName, primaryCombatType.combatTypeName AS primaryCombatTypeName FROM combat_grinding INNER JOIN enum_locations ON enum_locations.locationId = combat_grinding.FK_locationId INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId INNER JOIN enum_time ON enum_time.timeId = combat_grinding.FK_timeId INNER JOIN combat_classes ON combat_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON enum_class.classId = combat_classes.FK_classNameId INNER JOIN enum_classRole ON enum_classRole.roleId = combat_classes.FK_classRoleId INNER JOIN combat_gearScore ON combat_gearScore.gearScoreId = combat_grinding.FK_gearScoreId INNER JOIN enum_server ON enum_server.serverId = combat_grinding.FK_serverId INNER JOIN enum_combatType AS combatType ON combatType.combatTypeId = combat_grinding.FK_combatTypeId INNER JOIN enum_combatType AS primaryCombatType ON primaryCombatType.combatTypeId = combat_classes.FK_primaryCombatTypeId WHERE combat_grinding.grindingId = ?").get(grindingId);
}

exports.getCombatSettings = function(userId) {
    return db.prepare("SELECT * FROM combat_settings INNER JOIN security_settings ON combat_settings.combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = ?").get(userId);
}

exports.getCombatTableHeaders = function(combatSettingsId) {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
    return db.prepare("SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header, combat_columnDefaults.isActive FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.FK_combatSettingsId = ?").all(combatSettingsId);
}

exports.getColumnDefaults = function(combatSettingsId) {
    // return db.prepare("SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.isActive = 1 AND combat_columnDefaults.FK_combatSettingsId = ?").all(combatSettingsId);
    return db.prepare("SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header, combat_columnDefaults.isActive FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.FK_combatSettingsId = ?").all(combatSettingsId);
}

exports.getTotals = function(userId) {
    return db.prepare("SELECT IFNULL(SUM(trashLootAmount), 0) as trashLootAmount, IFNULL(SUM(enum_time.timeAmount), 0) as timeAmount, IFNULL(SUM(afuaruSpawns), 0)  as afuaruSpawns FROM combat_grinding INNER JOIN enum_time ON combat_grinding.FK_timeId = enum_time.timeId INNER JOIN security_settings ON combat_grinding.FK_combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = ?").get(userId);
}

exports.getTotalsDay = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getTotalsWeek = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getTotalsMonth = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getTotalsYear = function(userId) {
    // return db.prepare("SELECT SUM(trashLootAmount) as trashLootAmount, SUM(enum_time.timeAmount) as timeAmount, SUM(afuaruSpawns) as afuaruSpawns FROM combat_grinding INNER JOIN enum_time ON combat_grinding.FK_timeId = enum_time.timeId INNER JOIN security_settings ON combat_grinding.FK_combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = ? AND combat_grinding.date BETWEEN '01-01-2021' AND '03-20-2021'").get(userId);
}

exports.getTrashLootTotal = function(locationId, userId) {
    return db.prepare("SELECT IFNULL(SUM(trashLootAmount), 0) AS trashLootAmount FROM combat_grinding INNER JOIN enum_locations ON enum_locations.locationId = combat_grinding.FK_locationId INNER JOIN security_settings ON security_settings.FK_combatSettingsId = combat_grinding.FK_combatSettingsId WHERE FK_locationId = ? AND security_settings.FK_userId = ?").get(locationId, userId);
}

exports.getTrashLootDay = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getTrashLootWeek = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getTrashLootMonth = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getTrashLootYear = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getMainClass = function(combatSettingsId) {
    return db.prepare("SELECT combat_classes.classId, enum_class.className as className, enum_classRole.roleDescription as classRole, combat_classes.FK_gearScoreId as gearScoreId FROM combat_classes INNER JOIN enum_class ON enum_class.classId = combat_classes.FK_classNameId INNER JOIN enum_classRole ON enum_classRole.roleId = combat_classes.FK_classRoleId WHERE FK_combatSettingsId = ? AND FK_classRoleId = 1").get(combatSettingsId);
}

exports.getMainClassEntity = function(combatSettingsId) {
    return db.prepare("SELECT * FROM combat_classes WHERE FK_combatSettingsId = ? AND FK_classRoleId = 1").get(combatSettingsId);
}

exports.getClassGear = function(gearScoreId) {
    return db.prepare("SELECT ap, aap, dp, gearScore FROM combat_gearScore WHERE combat_gearScore.gearScoreId = ?").get(gearScoreId);
}

exports.getActiveClasses = function(combatSettingsId) {
    return db.prepare("SELECT combat_classes.classId as FK_classId, enum_class.className as className, enum_classRole.roleDescription as classRole, combat_classes.FK_gearScoreId as FK_gearScoreId FROM combat_classes INNER JOIN enum_class ON enum_class.classId = combat_classes.FK_classNameId INNER JOIN enum_classRole ON enum_classRole.roleId = combat_classes.FK_classRoleId WHERE FK_combatSettingsId = ?").all(combatSettingsId);
}

exports.getGivenClass = function(combatSettingsId, classId) {
    return db.prepare("SELECT * FROM combat_classes WHERE FK_combatSettingsId = ? AND classId = ?").all(combatSettingsId, classId);
}

// GET Enums

exports.getClassNameEnums = function() {
    return db.prepare("SELECT * FROM enum_class WHERE enum_class.classId != 1").all();
}

exports.getLocationEnums = function() {
    return db.prepare("SELECT enum_locations.locationId, enum_territory.territoryId, enum_locations.locationName, enum_territory.territoryName FROM enum_locations INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId WHERE enum_locations.locationId != 1").all();
}

exports.getClassRoleEnums = function() {
    return db.prepare("SELECT * FROM enum_classRole").all();
}

exports.getServerEnums = function() {
    return db.prepare("SELECT * FROM enum_server WHERE enum_server.serverId != 1").all();
}

exports.getTimeEnums = function() {
    return db.prepare("SELECT * FROM enum_time").all();
}

exports.getCombatTypeEnums = function() {
    return db.prepare("SELECT * FROM enum_combatType WHERE enum_combatType.combatTypeId != 1").all();
}

// POST 
exports.createCombatSettings = function(userId) {

}

exports.createClass = function(newClass) {
    db.prepare("INSERT OR REPLACE INTO combat_classes (FK_combatSettingsId, FK_classNameId, FK_classRoleId, FK_primaryCombatTypeId, dateCreated) VALUES (@FK_combatSettingsId, @FK_classNameId, @FK_classRoleId, @FK_primaryCombatTypeId, @dateCreated);").run(newClass);
    return db.prepare("SELECT classId as classId FROM combat_classes ORDER BY classId DESC LIMIT 1").get();  
}

exports.createGearScore = function(gearEntity) {
    db.prepare("INSERT OR REPLACE INTO combat_gearScore (FK_combatSettingsId, FK_classId, ap, aap, dp, gearScore, dateCreated) VALUES (@FK_combatSettingsId, @FK_classId, @ap, @aap, @dp, @gearScore, @dateCreated);").run(gearEntity);
    return db.prepare("SELECT gearScoreId as gearScoreId FROM combat_gearScore ORDER BY gearScoreId DESC LIMIT 1").get();
}

exports.updateHasDefaultCombatHeadersSet = function(combatSettingsId, hasDefaultCombatHeaders) {
    db.prepare("UPDATE combat_settings SET hasDefaultCombatHeaders = ? WHERE combatSettingsId = ?").run(hasDefaultCombatHeaders, combatSettingsId);
    // return db.prepare("SELECT combat_settings.hasDefaultCombatHeaders FROM combat_settings WHERE combat_settings.combatSettingsId = ?").get(combatSettingsId);
}

exports.createGrindingEntry = function(newEntry) {
    db.prepare("INSERT OR REPLACE INTO combat_grinding (FK_combatSettingsId, FK_timeId, FK_classId, FK_locationId, FK_serverId, FK_combatTypeId, FK_gearScoreId, dateCreated, trashLootAmount, afuaruSpawns) VALUES (@FK_combatSettingsId, @FK_timeId, @FK_classId, @FK_locationId, @FK_serverId, @FK_combatTypeId, @FK_gearScoreId, @dateCreated, @trashLootAmount, @afuaruSpawns);").run(newEntry);
    return db.prepare("SELECT * FROM combat_grinding ORDER BY grindingId DESC LIMIT 1").get();
}

// // PUT
exports.updateActiveColumns = function(combatSettingsId, columnHeadingId, isActive) {
    db.prepare("UPDATE combat_columnDefaults SET isActive = ? WHERE FK_combatSettingsId = ? AND FK_headingId = ?").run(isActive, combatSettingsId, columnHeadingId);  
}

exports.updateClassWithGearScoreId = function(gearScoreId, combatSettingsId, classIdObj) {
    var classID = classIdObj.classId;
    db.prepare("UPDATE combat_classes SET FK_gearScoreId = ? WHERE FK_combatSettingsId = ? AND classId = ?").run(gearScoreId, combatSettingsId, classID);
}