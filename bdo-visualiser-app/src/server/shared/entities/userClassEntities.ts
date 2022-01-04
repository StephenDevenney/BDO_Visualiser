
export class ClassNamesEnumEntity {
    public classId: number = 1;
    public className: string = "-";
    public fileName: string = "-";

    constructor(classId?: number, className?: string, fileName?: string) {
        if(classId) {
            this.classId = classId;
            this.className = className;
            this.fileName = fileName;
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
    public combatTypeCount: number = 0;

    constructor(combatTypeId?: number, combatTypeName?: string, combatTypeCount?: number) {
        if(combatTypeId) {
            this.combatTypeId = combatTypeId;
            this.combatTypeName = combatTypeName;
        }  

        if(combatTypeCount)
            this.combatTypeCount = combatTypeCount;
    }
}

export class UserClassEntity {
    public classId: number = 0;
    public FK_gearTypeId: number = 1;
    public FK_gearScoreId: number = 0;
    public classNameId: number = 1;
    public className: string = "";
    public fileName: string = "";
    public classRoleId: number = 5;
    public classRole: string = "";
    public combatTypeId: number = 1;
    public combatTypeName: string = "";
    public dateCreated: string = "";
    public classDescription: string = "";
    public userClassCount: number = 0;

    constructor(classId?: number, FK_gearTypeId?: number, FK_gearScoreId?: number, classNameId?: number, className?: string, fileName?: string, classRoleId?: number, classRole?: string, combatTypeId?: number, combatTypeName?: string, dateCreated?: string, classDescription?: string, userClassCount?: number) {
        if(classId) {
            this.classId = classId;
            this.FK_gearTypeId = FK_gearTypeId;
            this.FK_gearScoreId = FK_gearScoreId;
            this.classNameId = classNameId;
            this.className = className;
            this.fileName = fileName;
            this.classRoleId = classRoleId;
            this.classRole = classRole;
            this.combatTypeId = combatTypeId;
            this.combatTypeName = combatTypeName;
            this.dateCreated = dateCreated;
            this.classDescription= classDescription;
            this.userClassCount = userClassCount;
        }     
    }
}

export class GearEntity {
    public gearScoreId: number = 0;
    public gearScoreBuildId: number = 0;
    public ap: number = 0;
    public apBracketLow: number = 0;
    public apBracketHigh: number = 0;
    public apBracketBonus: number = 0;
    public aap: number = 0;
    public aapBracketLow: number = 0;
    public aapBracketHigh: number = 0;
    public aapBracketBonus: number = 0;
    public dp: number = 0;
    public dpBracketLow: number = 0;
    public dpBracketHigh: number = 0;
    public dpBracketBonus: number = 0;
    public gearScore: number = 0;
    public dateCreated: string = "";
    public gearLabel: string = "";
    public isCurrent: boolean = false;
    public nextApBracketLow: number = 0;
    public nextApBracketHigh: number = 0;
    public nextApBracketBonus: number = 0;
    public nextAapBracketLow: number = 0;
    public nextAapBracketHigh: number = 0;
    public nextAapBracketBonus: number = 0;
    public nextDpBracketLow: number = 0;
    public nextDpBracketHigh: number = 0;
    public nextDpBracketBonus: number = 0;
    public isActive: boolean = false;

    constructor(gearScoreId?: number, gearScoreBuildId?: number, ap?: number, apBracketLow?: number, apBracketHigh?: number, apBracketBonus?: number, aap?: number, aapBracketLow?: number, aapBracketHigh?: number, aapBracketBonus?: number, dp?: number, dpBracketLow?: number, dpBracketHigh?: number, dpBracketBonus?: number, gearScore?: number, dateCreated?: string, gearLabel?: string, isCurrent?: boolean, nextApBracketLow?: number, nextApBracketHigh?: number, nextApBracketBonus?: number, nextAapBracketLow?: number, nextAapBracketHigh?: number, nextAapBracketBonus?: number, nextDpBracketLow?: number, nextDpBracketHigh?: number, nextDpBracketBonus?: number, isActive?: boolean) {
        if(gearScoreId) {
            this.gearScoreId = gearScoreId;
            this.gearScoreBuildId = gearScoreBuildId;
            this.ap = ap;
            this.apBracketLow = apBracketLow;
            this.apBracketHigh = apBracketHigh;
            this.apBracketBonus = apBracketBonus;
            this.aap = aap;
            this.aapBracketLow = aapBracketLow;
            this.aapBracketHigh = aapBracketHigh;
            this.aapBracketBonus = aapBracketBonus;
            this.dp = dp;
            this.dpBracketLow = dpBracketLow;
            this.dpBracketHigh = dpBracketHigh;
            this.dpBracketBonus = dpBracketBonus;
            this.gearScore = gearScore;
            this.dateCreated = dateCreated;
            this.gearLabel = gearLabel;
            this.isCurrent = isCurrent;
            this.nextApBracketLow = nextApBracketLow;
            this.nextApBracketHigh = nextApBracketHigh;
            this.nextApBracketBonus = nextApBracketBonus;
            this.nextAapBracketLow = nextAapBracketLow;
            this.nextAapBracketHigh = nextAapBracketHigh;
            this.nextAapBracketBonus = nextAapBracketBonus;
            this.nextDpBracketLow = nextDpBracketLow;
            this.nextDpBracketHigh = nextDpBracketHigh;
            this.nextDpBracketBonus = nextDpBracketBonus;
            this.isActive = isActive;
        }
    }
}

export class GearBracketsEntity {
    public bracketId: number = 0;
    public userClassId: number = 0;
    public bracketLow: number = 0;
    public bracketHigh: number = 0;
    public bracketBonus: number = 0;
    public description: string = "";

    constructor(bracketId?: number, userClassId?: number, bracketLow?: number, bracketHigh?: number, bracketBonus?: number, description?: string) {
        if(bracketId) {
            this.bracketId = bracketId;
            this.userClassId = userClassId;
            this.bracketLow = bracketLow;
            this.bracketHigh = bracketHigh;
            this.bracketBonus = bracketBonus;
            this.description = description;
        }
    }
}

export class UserClassRoleChecksEntity {
    public hasMainClass: boolean = false;
    public hasSecondaryClass: boolean = false;

    constructor(hasMainClass?: boolean, hasSecondaryClass?: boolean) {
        if(hasMainClass) {
            this.hasMainClass = hasMainClass;
            this.hasSecondaryClass = hasSecondaryClass;
        }
    }
}