
export class ClassNamesEnumEntity {
    public classId: number = 1;
    public className: string = "-";

    constructor(classId?: number, className?: string) {
        if(classId) {
            this.classId = classId;
            this.className = className;
        }
    }
}

export class ClassRoleEnumEntity {
    public roleId: number = 1;
    public roleDescription: string = "-";

    constructor(roleId?: number, roleDescription?: string) {
        if(roleId) {
            this.roleId = roleId;
            this.roleDescription = roleDescription;
        }
    }
}

export class CombatTypesEnumEntity {
    public combatTypeId: number = 1;
    public combatTypeName: string = "-";

    constructor(combatTypeId?: number, combatTypeName?: string) {
        if(combatTypeId) {
            this.combatTypeId = combatTypeId;
            this.combatTypeName = combatTypeName;
        }  
    }
}

export class UserClassEntity {
    public classId: number = 0;
    public FK_gearScoreId: number = 0;
    public classNameId: number = 1;
    public className: string = "";
    public classRoleId: number = 5;
    public classRole: string = "";
    public combatTypeId: number = 1;
    public combatTypeName: string = "";
    public dateCreated: string = "";
    public classDescription: string = "";
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0;
    public gearScore: number = 0;

    constructor(classId?: number, FK_gearScoreId?: number, classNameId?: number, className?: string, classRoleId?: number, classRole?: string, combatTypeId?: number, combatTypeName?: string, dateCreated?: string, classDescription?: string, ap?: number, aap?: number, dp?: number, gearScore?: number) {
        if(classId) {
            this.classId = classId;
            this.FK_gearScoreId = FK_gearScoreId;
            this.classNameId = classNameId;
            this.className = className;
            this.classRoleId = classRoleId;
            this.classRole = classRole;
            this.combatTypeId = combatTypeId;
            this.combatTypeName = combatTypeName;
            this.dateCreated = dateCreated;
            this.classDescription= classDescription;
            this.ap = ap;
            this.aap = aap;
            this.dp = dp;
            this.gearScore = gearScore;
        }     
    }
}

export class GearEntity {
    public gearScoreId: number = 0;
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0
    public gearScore: number = 0;
    public dateCreated: string = "";

    constructor(gearScoreId?: number, ap?: number, aap?: number, dp?: number, gearScore?: number, dateCreated?: string) {
        if(gearScoreId) {
            this.gearScoreId = gearScoreId;
            this.ap = ap;
            this.aap = aap;
            this.dp = dp;
            this.gearScore = gearScore;
            this.dateCreated = dateCreated;
        }   
    }
}