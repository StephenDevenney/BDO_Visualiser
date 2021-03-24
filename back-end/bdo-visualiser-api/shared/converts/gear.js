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
exports.convertToEntity = function(classVM, classEntity, classIdObj) {
    var gear = { 
        FK_combatSettingsId: classEntity.FK_combatSettingsId,
        FK_classId: classIdObj,
        ap: classVM.gear.ap,
        aap: classVM.gear.aap,
        dp: classVM.gear.dp,
        gearScore: classVM.gear.gearScore,
        dateCreated: Date.now().toString()
    }

    return gear;
}