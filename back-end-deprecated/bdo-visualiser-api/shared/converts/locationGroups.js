const sqlContext = require("../../source/sqlContext/combatContext");
/*
    ##  Location Groups View Model
        label - string
        item - 
            locationId - number
            territoryId - number
            locationName - string
            territoryName - string
            recommendedLevel - string
            recommendedAP - string
*/
exports.convertToVM = async function (territory) {
    var territoryLocationsEnum = sqlContext.getTerritoryLocationsEnums(territory.territoryId);
    var returnVM = {
        label: territory.territoryName,
        items: territoryLocationsEnum
    }

    return returnVM;
}

exports.convertRecentToVM = async function (combatSettingsId) {
    var territoryLocationsEnum = sqlContext.getRecentLocations(combatSettingsId);
    var returnVM = {
        label: "Recent",
        items: territoryLocationsEnum
    }

    return returnVM;
}