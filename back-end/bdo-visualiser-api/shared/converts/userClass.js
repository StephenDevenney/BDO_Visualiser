const sqlContext = require("../../source/sqlContext/combatContext");
const CalcDate = require("../calc/unixDate");

/*
    ## Class Entity
        FK_combatSettingsId
        FK_classNameId
        FK_classRoleId
        FK_primaryCombatTypeId
        dateCreated
*/
exports.convertToEntity = function(newClass, combatSettingsIdObj) {
    var classNamesEnum = sqlContext.getClassNameEnums();
    var classRolesEnum = sqlContext.getClassRoleEnums();
    var combatTypesEnum = sqlContext.getCombatTypeEnums();

    var cn = classNamesEnum.filter(classObj => classObj.className == newClass.className);
    var classIdConverted = cn[0].classId;
    var cr = classRolesEnum.filter(roleObj => roleObj.roleDescription == newClass.classRole);
    var classRoleConverted = cr[0].roleId;
    var ct = combatTypesEnum.filter(combatTypeObj => combatTypeObj.combatTypeName == newClass.primaryCombatTypeDescription);
    var combatTypeConverted = 2;
    if(typeof(ct) != "undefined" && ct.length > 0)
        combatTypeConverted = ct[0].combatTypeId;

    var classEntity = {
        FK_combatSettingsId: combatSettingsIdObj,
        FK_classNameId: classIdConverted,
        FK_classRoleId: classRoleConverted,
        FK_primaryCombatTypeId: combatTypeConverted,
        dateCreated: CalcDate.calcUnixDate(),
    }

    return classEntity;
}

/*
    ## Class View Model
        classId
        className
        classRole
        gear: 
            ap
            aap
            dp
            gearScore
        
*/
exports.convertToViewModel = function(classEntity, gearEntity, classIdObj) {
    var classNamesEnum = sqlContext.getClassNameEnums();
    var classRolesEnum = sqlContext.getClassRoleEnums();

    var cn = classNamesEnum.filter(classObj => classObj.classId == classEntity.FK_classNameId);
    var classNameConverted = cn[0].className;
    var cr = classRolesEnum.filter(roleObj => roleObj.roleId == classEntity.FK_classRoleId);
    var classRoleConverted = cr[0].roleDescription;

    var userClass = { 
        classId: classIdObj,
        className: classNameConverted, 
        classRole: classRoleConverted,
        gear: {
            gearScoreId: gearEntity.gearScoreId,
            ap: gearEntity.ap, 
            aap: gearEntity.aap, 
            dp: gearEntity.dp, 
            gearScore: gearEntity.gearScore 
        },
        description: classNameConverted + " - " + gearEntity.gearScore + " GS"
    };
    return userClass;
}

exports.convertEntitiesToViewModel = function(classEntity, gearEntity) {
    var userClass = { 
        classId: classEntity.FK_classId,
        className: classEntity.className, 
        classRole: classEntity.classRole,
        gear: { 
            gearScoreId: classEntity.FK_gearScoreId,
            ap: gearEntity.ap, 
            aap: gearEntity.aap, 
            dp: gearEntity.dp, 
            gearScore: gearEntity.gearScore 
        },
        description: classEntity.className + " - " + gearEntity.gearScore + " GS"
    };

    return userClass;
}