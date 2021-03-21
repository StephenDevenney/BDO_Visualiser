require('dotenv').config();
const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });

// Get
exports.getGrindingData = function(userId) {
    return db.prepare("SELECT combat_grinding.grindingId, combat_grinding.trashLootAmount, combat_grinding.date, enum_time.timeAmount, enum_class.className, enum_locations.locationName, (enum_server.serverName || ' ' || enum_server.serverNumber) AS serverName, enum_combatType.combatTypeName, combat_gearScore.gearScore, combat_grinding.afuaruSpawns FROM combat_grinding INNER JOIN enum_time ON combat_grinding.FK_timeId = enum_time.timeId INNER JOIN combat_classes ON combat_classes.FK_combatSettingsId = combat_grinding.FK_combatSettingsId AND combat_classes.classId = combat_grinding.FK_classId INNER JOIN enum_class ON combat_classes.FK_classNameId = enum_class.classId INNER JOIN enum_locations ON combat_grinding.FK_locationId = enum_locations.locationId INNER JOIN enum_server ON combat_grinding.FK_serverId = enum_server.serverId INNER JOIN enum_combatType ON combat_grinding.FK_combatTypeId = enum_combatType.combatTypeId INNER JOIN combat_gearScore ON combat_grinding.FK_gearScoreId = combat_gearScore.gearScoreId INNER JOIN security_settings ON combat_grinding.FK_combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = ?").all(userId);
}

exports.getCombatSettingsId = function(userId) {
    return db.prepare("SELECT combat_settings.combatSettingsId FROM combat_settings INNER JOIN security_settings ON combat_settings.combatSettingsId = security_settings.FK_combatSettingsId WHERE security_settings.FK_userId = ?").get(userId);
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

// POST 
exports.createCombatSettings = function(userId) {

}

// // PUT
exports.updateActiveColumns = function(combatSettingsId, columnHeadingId, isActive) {
    db.prepare("UPDATE combat_columnDefaults SET isActive = ? WHERE FK_combatSettingsId = ? AND FK_headingId = ?").run(isActive, combatSettingsId, columnHeadingId);  
}