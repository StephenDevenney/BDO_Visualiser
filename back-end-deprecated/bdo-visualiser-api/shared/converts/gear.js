const CalcDate = require("../calc/unixDate");
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
    var gear = { 
        FK_combatSettingsId: classEntity.FK_combatSettingsId,
        FK_classId: classIdObj,
        ap: gearVM.ap,
        aap: gearVM.aap,
        dp: gearVM.dp,
        gearScore: gearVM.gearScore,
        dateCreated: CalcDate.calcUnixDate()
    }

    return gear;
}

exports.reConvertToEntity = function(gearEntity, gearScoreIdObj) {
    var gear = { 
        FK_combatSettingsId: gearEntity.FK_combatSettingsId,
        FK_classId: gearEntity.FK_classId,
        gearScoreId: gearScoreIdObj,
        ap: gearEntity.ap,
        aap: gearEntity.aap,
        dp: gearEntity.dp,
        gearScore: gearEntity.gearScore,
        dateCreated: gearEntity.dateCreated
    }

    return gear;
}