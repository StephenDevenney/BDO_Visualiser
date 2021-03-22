/*
    ## Class Entity
        FK_combatSettingsId
        FK_classNameId
        FK_classRoleId
        dateCreated
*/
exports.convertToEntity = function(newClass, classRoles, classNameList, combatSettingsIdObj) {
    var cn = classNameList.filter(classObj => classObj.className == newClass.className);
    var classIdConverted = cn[0].classId;
    var cr = classRoles.filter(roleObj => roleObj.roleDescription == newClass.classRole);
    var classRoleConverted = cr[0].roleId;

    var classEntity = {
        FK_combatSettingsId: combatSettingsIdObj,
        FK_classNameId: classIdConverted,
        FK_classRoleId: classRoleConverted,
        dateCreated: Date.now().toString()
    }

    return classEntity;
}

/*
    ## Class View Model
        className
        classRole
        gear: 
            ap
            aap
            dp
            gearScore
        
*/
exports.convertToViewModel = function(classEntity, gearEntity, classRoles, classNameList) {
    var cn = classNameList.filter(classObj => classObj.classId == classEntity.FK_classNameId);
    var classNameConverted = cn[0].className;
    var cr = classRoles.filter(roleObj => roleObj.roleId == classEntity.FK_classRoleId);
    var classRoleConverted = cr[0].roleDescription;

    var userClass = { 
        className: classNameConverted, 
        classRole: classRoleConverted,
        gear: { 
            ap: gearEntity.ap, 
            aap: gearEntity.aap, 
            dp: gearEntity.dp, 
            gearScore: gearEntity.gearScore 
        } 
    };
    return userClass;
}