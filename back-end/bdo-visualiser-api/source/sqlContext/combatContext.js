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

exports.getCombatTableHeaders = function() {
    return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

exports.getColumnDefaults = function(combatSettingsId) {
    return db.prepare("SELECT enum_combatTableHeadings.headingId, enum_combatTableHeadings.field, enum_combatTableHeadings.header FROM enum_combatTableHeadings INNER JOIN combat_columnDefaults ON combat_columnDefaults.FK_headingId = enum_combatTableHeadings.headingId WHERE combat_columnDefaults.isActive = 1 AND combat_columnDefaults.FK_combatSettingsId = ?").all(combatSettingsId);
}

exports.getTotals = function() {
    // return db.prepare("SELECT * FROM enum_combatTableHeadings").all();
}

// Post 
exports.createCombatSettings = function(userId) {

}