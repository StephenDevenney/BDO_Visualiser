const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });
const sqlContext = require("../../source/sqlContext/combatContext");
const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'security_user';").get();
var timeEnum;
var combatTypesEnum;
if (table['count(*)']) {
    timeEnum = sqlContext.getTimeEnums();
    combatTypesEnum = sqlContext.getCombatTypeEnums();
}

/*
    ## Combat Table Entry Entity
        FK_combatSettingsId - int
        FK_classId - int
        FK_locationId - int
        FK_timeId - int
        FK_serverId - int
        FK_combatTypeId - int
        FK_gearScoreId - int
        dateCreated - string (Unix epoch)
        trashLootAmount - int
        afuaruSpawns - int
*/
exports.convertToEntity = function(newEntry, combatSettingsIdObj) {

    var newEntryEntity = {
        FK_combatSettingsId: combatSettingsIdObj,
        FK_classId: newEntry.userClass.classId,
        FK_locationId: newEntry.grindLocation.locationId,
        FK_timeId: newEntry.timeAmount.timeId,
        FK_serverId: newEntry.server.serverId,
        FK_combatTypeId: newEntry.combatType.combatTypeId,
        FK_gearScoreId: newEntry.userClass.gear.gearScoreId,
        dateCreated: Date.now().toString(),
        trashLootAmount: newEntry.trashLootAmount,
        afuaruSpawns: newEntry.afuaruSpawns
    }

    return newEntryEntity;
}

/*
    ## Combat Table Entry View Model
        grindingId - number
        date - string
        grindLocation: 
            locationId - number
            locationName - string
            territoryId - number
            territoryName - string
        timeAmount - number
        trashLootAmount - number
        userClass:
            classId - number
            className - string
            classRole - string
            description - string
            gear: 
                ap - number
                aap - number
                dp - number
                gearScore - number
        server: 
            serverId - number
            serverDescription - string
            isElviaRealm - boolean
        combatTypeDescription - string
        
*/
exports.convertToViewModel = function(newEntity, newEntry) {
    var returnVM = newEntry;
    returnVM.grindingId = newEntity.grindingId;

    return returnVM;
}