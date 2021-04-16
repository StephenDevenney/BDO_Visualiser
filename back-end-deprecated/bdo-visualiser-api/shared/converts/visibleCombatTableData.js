const sqlContext = require("../../source/sqlContext/combatContext");

/*
    ## Combat Table Entry Entity
        grindingId - number
        classId - number
        dateCreated - string 
        locationName - string
        timeAmount - string
        trashLootAmount - number
        className - string
        serverName - string
        combatTypeName - string
        afuaruSpawns - number
*/
exports.convertToViewModel = function(tableData) {
    var tableDataViewModel;
    if(typeof(tableData) != "undefined"){
        tableDataViewModel = {
            grindingId: tableData.grindingId,
            classId: tableData.userClass.classId,
            dateCreated: tableData.dateCreated,
            locationName: tableData.grindLocation.locationName,
            timeAmount: tableData.timeAmount.timeAmount + " Minutes",
            trashLootAmount: tableData.trashLootAmount,
            className: tableData.userClass.className,
            serverName: tableData.server.serverDescription,
            combatTypeName: tableData.combatType.combatTypeName,
            afuaruSpawns: tableData.afuaruSpawns
        }
    }

    return tableDataViewModel;
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
        dateCreated - string
        trashLootAmount - int
        afuaruSpawns - int
*/
exports.convertImportToEntity = async function(newEntry, combatSettingsIdObj) {
    var gearScoreId = 0;
    var classId = 0;
    var combatTypeId = 0;
    if(typeof(newEntry.classId) == "undefined" || newEntry.classId == 0){
        var classObj = sqlContext.getMainClassEntity(combatSettingsIdObj);
        gearScoreId = classObj.FK_gearScoreId;
        classId = classObj.classId;
        combatTypeId = classObj.FK_primaryCombatTypeId;
    }
    else {
        try {
            var classEntity = sqlContext.getGivenClass(combatSettingsIdObj, newEntry.classId)[0];  
            if(typeof(classEntity) != "undefined"){
                classId = classEntity.classId;
                gearScoreId = classEntity.FK_gearScoreId;
            }
                
            else {
                var classObject = sqlContext.getMainClassEntity(combatSettingsIdObj);
                gearScoreId = classObject.FK_gearScoreId;
                classId = classObject.classId;
                combatTypeId = classObject.FK_primaryCombatTypeId;
            }   
        }
        catch {
            var classObject = sqlContext.getMainClassEntity(combatSettingsIdObj);
            gearScoreId = classObject.FK_gearScoreId;
            classId = classObject.classId;
            combatTypeId = classObject.FK_primaryCombatTypeId;
        }    
    }
    var locationNamesEnum = sqlContext.getLocationEnums();
    var serversEnum = sqlContext.getServerEnums();
    var combatTypesEnum = sqlContext.getCombatTypeEnums();
    var timeAmountEnum = sqlContext.getTimeEnums();

    var locationId;
    if(typeof(newEntry.locationName) == "undefined" || newEntry.locationName == "")
        locationId = 1;
    else {
        try { locationId = locationNamesEnum.filter(_ => _.locationName == newEntry.locationName)[0].locationId; }
        catch { locationId = 1; }
    }

    var serverId;
    if(typeof(newEntry.serverName) == "undefined" || newEntry.serverName == "")
        serverId = 1;
    else {
        try{ serverId = serversEnum.filter(_ => _.serverName == newEntry.serverName)[0].serverId; } 
        catch { serverId = 1; }
    }

    var combatTypeId;
    if(typeof(newEntry.combatTypeName) == "undefined" || newEntry.combatTypeName == "")
        combatTypeId = 1;
    else {
        try { combatTypeId = combatTypesEnum.filter(_ => _.combatTypeName == newEntry.combatTypeName)[0].combatTypeId; }
        catch { combatTypeId = 1; }
    }

    var timeId;
    if(typeof(newEntry.timeAmount) == "undefined" || newEntry.timeAmount == "")
        timeId = 1;
    else {
        for (var i = 0; i < timeAmountEnum.length; i++) {
            try {
                if (timeAmountEnum[i].timeAmount == newEntry.timeAmount.slice(0, 2)) {
                    timeId = timeAmountEnum[i].timeId;
                }
                else if (timeAmountEnum[i].timeAmount == newEntry.timeAmount.slice(0, 3)) {
                    timeId = timeAmountEnum[i].timeId;
                }
            }
            catch { timeId = 1; }
        }
    }

    var newEntryEntity = {
        FK_combatSettingsId: combatSettingsIdObj,
        FK_classId: classId,
        FK_locationId: locationId,
        FK_timeId: timeId,
        FK_serverId: serverId,
        FK_combatTypeId: combatTypeId,
        FK_gearScoreId: gearScoreId,
        dateCreated: newEntry.dateCreated,
        trashLootAmount: parseInt(newEntry.trashLootAmount),
        afuaruSpawns: parseInt(newEntry.afuaruSpawns)
    }

    return newEntryEntity;
}