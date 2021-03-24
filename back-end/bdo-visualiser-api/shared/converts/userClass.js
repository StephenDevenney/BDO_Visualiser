const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME);
const sqlContext = require("../../source/sqlContext/combatContext");
const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'security_user';").get();
var classNamesEnum;
var classRolesEnum;
if (table['count(*)']) {
    classNamesEnum = sqlContext.getClassNameEnums();
    classRolesEnum = sqlContext.getClassRoleEnums();
}

/*
    ## Class Entity
        FK_combatSettingsId
        FK_classNameId
        FK_classRoleId
        dateCreated
*/
exports.convertToEntity = function(newClass, combatSettingsIdObj) {
    if(typeof(classNamesEnum) == "undefined"){
        classNamesEnum = sqlContext.getClassNameEnums();
        classRolesEnum = sqlContext.getClassRoleEnums();
    }

    var cn = classNamesEnum.filter(classObj => classObj.className == newClass.className);
    var classIdConverted = cn[0].classId;
    var cr = classRolesEnum.filter(roleObj => roleObj.roleDescription == newClass.classRole);
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
    if(typeof(classNamesEnum) == "undefined"){
        classNamesEnum = sqlContext.getAllClassNames();
        classRolesEnum = sqlContext.getAllClassRoles();
    }

    var cn = classNamesEnum.filter(classObj => classObj.classId == classEntity.FK_classNameId);
    var classNameConverted = cn[0].className;
    var cr = classRolesEnum.filter(roleObj => roleObj.roleId == classEntity.FK_classRoleId);
    var classRoleConverted = cr[0].roleDescription;

    var userClass = { 
        classId: classIdObj,
        className: classNameConverted, 
        classRole: classRoleConverted,
        gear: { 
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
            ap: gearEntity.ap, 
            aap: gearEntity.aap, 
            dp: gearEntity.dp, 
            gearScore: gearEntity.gearScore 
        },
        description: classEntity.className + " - " + gearEntity.gearScore + " GS"
    };

    return userClass;
}