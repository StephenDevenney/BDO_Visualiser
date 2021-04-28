export class ClassCreationViewModel {
    public classNamesEnum: Array<ClassNamesEnumViewModel> = new Array<ClassNamesEnumViewModel>();
    public combatTypesEnum: Array<CombatTypesEnumViewModel> = new Array<CombatTypesEnumViewModel>();
    public classRolesEnum: Array<ClassRolesEnumViewModel> = new Array<ClassRolesEnumViewModel>();
    public newUserClass: UserClassViewModel = new UserClassViewModel();
    public hasMainUserClass: boolean = false;

    constructor(classNamesEnum?: Array<ClassNamesEnumViewModel>, combatTypesEnum?: Array<CombatTypesEnumViewModel>, classRolesEnum?: Array<ClassRolesEnumViewModel>, newUserClass?: UserClassViewModel, hasMainUserClass?: boolean) {
        if(classNamesEnum) {
            this.classNamesEnum = classNamesEnum;
            this.combatTypesEnum = combatTypesEnum;
            this.classRolesEnum = classRolesEnum;
            this.newUserClass = newUserClass;
            this.hasMainUserClass = hasMainUserClass;
        }
    }
}

export class ClassNamesEnumViewModel {
    public classId: number = 1;
    public className: string = "-";
    public isSelected: boolean = false;

    constructor(classId?: number, className?: string, isSelected?: boolean) {
        if(classId) {
            this.classId = classId;
            this.className = className;
            this.isSelected = isSelected;
        }
    }
}

export class ClassRolesEnumViewModel {
    public classRoleId: number = 5;
    public classRole: string = "Alt";

    constructor(classRoleId?: number, classRole?: string) {
        if(classRoleId) {
            this.classRoleId = classRoleId;
            this.classRole = classRole;
        }
    }
}

export class UserClassViewModel {
    public classId: number = 0;
    public className: string = "";
    public classRole: ClassRolesEnumViewModel = new ClassRolesEnumViewModel();
    public combatTypeDescription: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();
    public gear: GearViewModel = new GearViewModel();
    public classDescription: string = "";

    constructor(classId?: number, className?: string, classRole?: ClassRolesEnumViewModel, combatTypeDescription?: CombatTypesEnumViewModel, gear?: GearViewModel, classDescription?: string) {
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