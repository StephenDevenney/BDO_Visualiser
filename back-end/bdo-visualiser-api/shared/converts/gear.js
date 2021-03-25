/*
    ## Gear Entity
        FK_combatSettingsId
        FK_classId
        ap
        aap
        dp
        gearScore
        dateCreated
*/
exports.convertToEntity = function(gearVM, classEntity, classIdObj) {
    // console.log(gearVM);
    var gear = { 
        FK_combatSettingsId: classEntity.FK_combatSettingsId,
        FK_classId: classIdObj,
        ap: gearVM.ap,
        aap: gearVM.aap,
        dp: gearVM.dp,
        gearScore: gearVM.gearScore,
        dateCreated: Date.now().toString()
    }

    return gear;
}