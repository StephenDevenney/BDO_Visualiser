const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });
const sqlContext = require("../../source/sqlContext/combatContext");
const CalcDate = require("../calc/unixDate");

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
    var gearScoreId;
    var classId;
    var combatTypeId;
    if(typeof(newEntry.userClass.classId) == "undefined" || typeof(newEntry.userClass.gear.gearScoreId) == "undefined" || typeof(newEntry.combatType.combatTypeId) == "undefined" || newEntry.userClass.gear.gearScoreId == 0 || newEntry.userClass.classId == 0 || newEntry.combatType.combatTypeId){
        var classObj = sqlContext.getMainClassEntity(combatSettingsIdObj);
        console.log(classObj);
        gearScoreId = classObj.FK_gearScoreId;
        classId = classObj.classId;
        combatTypeId = classObj.FK_primaryCombatTypeId;
    }
    else {
        gearScoreId = newEntry.userClass.gear.gearScoreId;
        classId = newEntry.userClass.classId;
        combatTypeId = newEntry.combatType.combatTypeId;
    }

    var locationId;
    if(typeof(newEntry.grindLocation.locationId) == "undefined")
        locationId = 1;
    else 
        locationId = newEntry.grindLocation.locationId;

    var newEntryEntity = {
        FK_combatSettingsId: combatSettingsIdObj,
        FK_classId: classId,
        FK_locationId: locationId,
        FK_timeId: newEntry.timeAmount.timeId,
        FK_serverId: newEntry.server.serverId,
        FK_combatTypeId: combatTypeId,
        FK_gearScoreId: gearScoreId,
        dateCreated: CalcDate.calcUnixDate(),
        trashLootAmount: newEntry.trashLootAmount,
        afuaruSpawns: newEntry.afuaruSpawns
    }

    return newEntryEntity;
}

/*
    ## Combat Table Entry View Model
        grindingId - number
        dateCreated - string
        grindLocation: 
            locationId - number
            locationName - string
            territoryId - number
            territoryName - string
        time:
            timeId - number 
            timeAmount - number
        trashLootAmount - number
        afuaruSpawns - number
        userClass:
            classId - number
            className - string
            classRole - string
            description - string
            primaryCombatTypeDescription - string
            gear: 
                gearScoreId - number
                ap - number
                aap - number
                dp - number
                gearScore - number
        server: 
            serverId - number
            serverDescription - string
            isElviaRealm - boolean
        combatType:
            combatTypeId - number
            combatTypeName - string
*/

exports.convertToViewModel = function(tableEntity) {
    var tableEntryDetails = sqlContext.getTableEntryDetails(tableEntity.grindingId);
    var isElviaRealmCheck = false;
    if(tableEntity.isElviaRealm == 1)
        isElviaRealmCheck = true;

    var returnVM;

    if(typeof(tableEntryDetails) != "undefined") {
        returnVM = {
            "grindingId": tableEntity.grindingId,
            "dateCreated": tableEntity.dateCreated,
            "grindLocation": 
                {
                    "locationId": tableEntity.FK_locationId,
                    "locationName": tableEntryDetails.locationName,
                    "territoryId": tableEntryDetails.territoryId,
                    "territoryName": tableEntryDetails.territoryName
                },
            "timeAmount":
                {
                    "timeId": tableEntity.FK_timeId,
                    "timeAmount": tableEntryDetails.timeAmount
                },
            "trashLootAmount": tableEntity.trashLootAmount,
            "afuaruSpawns": tableEntity.afuaruSpawns,
            "userClass":
                {
                    "classId": tableEntity.FK_classId,
                    "className": tableEntryDetails.className,
                    "classRole": tableEntryDetails.classRole,
                    "description": tableEntryDetails.className + " - " + tableEntryDetails.gearScore + " GS",
                    "primaryCombatTypeDescription": tableEntryDetails.primaryCombatTypeName,
                    "gear":
                        {
                            "gearScoreId": tableEntity.FK_gearScoreId,
                            "ap": tableEntryDetails.ap,
                            "aap": tableEntryDetails.aap,
                            "dp": tableEntryDetails.dp,
                            "gearScore": tableEntryDetails.gearScore,
                        }
                },
            "server": 
                {
                    "serverId": tableEntity.FK_serverId,
                    "serverDescription": tableEntryDetails.serverDescription,
                    "isElviaRealm": isElviaRealmCheck,
                },
            "combatType":
                {
                    "combatTypeId": tableEntity.FK_combatTypeId,
                    "combatTypeName": tableEntryDetails.combatTypeName
                }
        }
    }

    return returnVM;
}

exports.reConvertToViewModel = function(newEntity, newEntry) {
    var returnVM = newEntry;
    returnVM.grindingId = newEntity.grindingId;
    returnVM.dateCreated = newEntity.dateCreated;
    return returnVM;
}