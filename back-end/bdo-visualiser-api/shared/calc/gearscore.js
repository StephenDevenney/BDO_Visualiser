/*
    ## Calculate Gear Score
        gear score is only calculated on creation, as there will be snapshots of gear scores,
        no gear score table entry will be updated.
*/
exports.calcGearScore = function(gearObj) {
    var gearScoreUpdated = Math.floor((gearObj.ap + gearObj.aap) / 2) + gearObj.dp;
    var gear = {
        FK_combatSettingsId: gearObj.FK_combatSettingsId,
        FK_classId: gearObj.FK_classId,
        ap: gearObj.ap,
        aap: gearObj.aap,
        dp: gearObj.dp,
        gearScore: gearScoreUpdated,
        dateCreated: gearObj.dateCreated
    }

    return gear;
}