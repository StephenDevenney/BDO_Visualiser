
export class ClassNamesEnumViewModel {
    public classId: number = 1;
    public className: string = "-";

    constructor(classId?: number, className?: string) {
        if(classId) {
            this.classId = classId;
            this.className = className;
        }
    }
}

export class UserClassViewModel {
    public classId: number = 0;
    public className: string = "";
    public classRole: string = "";
    public combatTypeDescription: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();
    public gear: GearViewModel = new GearViewModel();
    public classDescription: string = "";

    constructor(classId?: number, className?: string, classRole?: string, combatTypeDescription?: CombatTypesEnumViewModel, gear?: GearViewModel, classDescription?: string) {
        if(classId) {
            this.classId = classId;
            this.className = className;
            this.classRole = classRole;
            this.combatTypeDescription = combatTypeDescription;
            this.gear = gear;
            this.classDescription = classDescription;
        }     
    }
}

export class GearViewModel {
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0
    public gearScore: number = 0;

    constructor(ap?: number, aap?: number, dp?: number, gearScore?: number) {
        if(ap) {
            this.ap = ap;
            this.aap = aap;
            this.dp = dp;
            this.gearScore = gearScore;
        }   
    }
}

export class CombatTypesEnumViewModel {
    public combatTypeId: number = 1;
    public combatTypeName: string = "-";

    constructor(combatTypeId?: number, combatTypeName?: string) {
        if(combatTypeId) {
            this.combatTypeId = combatTypeId;
            this.combatTypeName = combatTypeName;
        }  
    }
}