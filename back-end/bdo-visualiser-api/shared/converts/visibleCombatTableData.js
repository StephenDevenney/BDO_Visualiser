/*
    ## Combat Table Entry Entity
        grindingId - number
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