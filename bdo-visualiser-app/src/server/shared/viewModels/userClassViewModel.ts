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

export class ClassEditViewModel {
    public builds: BuildsViewModel = new BuildsViewModel();
    public userClassRole: ClassRolesEnumViewModel = new ClassRolesEnumViewModel();
    public userClassCombatType: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();
    public userClassRolesEnum: Array<ClassRolesEnumViewModel> = new Array<ClassRolesEnumViewModel>();
    public userClassCombatTypesEnum: Array<CombatTypesEnumViewModel> = new Array<CombatTypesEnumViewModel>();

    constructor(builds?: BuildsViewModel, userClassRole?: ClassRolesEnumViewModel, userClassCombatType?: CombatTypesEnumViewModel, userClassRolesEnum?: Array<ClassRolesEnumViewModel>, userClassCombatTypesEnum?: Array<CombatTypesEnumViewModel>) {
        if(builds) {
            this.builds = builds;
            this.userClassRole = userClassRole;
            this.userClassCombatType = userClassCombatType;
            this.userClassRolesEnum = userClassRolesEnum;
            this.userClassCombatTypesEnum = userClassCombatTypesEnum;
        }
    }
}

export class CharacterCardsViewModel {
    public userClasses: Array<UserClassViewModel> = new Array<UserClassViewModel>();
    
    constructor(userClasses?: Array<UserClassViewModel>) {
        this.userClasses = userClasses;
    }
}

export class ClassNamesEnumViewModel {
    public classId: number = 1;
    public className: string = "-";
    public fileName: string = "-";
    public isSelected: boolean = false;

    constructor(classId?: number, className?: string, fileName?: string, isSelected?: boolean) {
        if(classId) {
            this.classId = classId;
            this.className = className;
            this.fileName = fileName;
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
    public classNameEnum: ClassNamesEnumViewModel = new ClassNamesEnumViewModel();
    public classRoleEnum: ClassRolesEnumViewModel = new ClassRolesEnumViewModel();
    public combatTypeEnum: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();
    public gear: GearViewModel = new GearViewModel();
    public classDescription: string = "";

    constructor(classId?: number, className?: ClassNamesEnumViewModel, classRole?: ClassRolesEnumViewModel, combatTypeDescription?: CombatTypesEnumViewModel, gear?: GearViewModel, classDescription?: string) {
        if(classId) {
            this.classId = classId;
            this.classNameEnum = className;
            this.classRoleEnum = classRole;
            this.combatTypeEnum = combatTypeDescription;
            this.gear = gear;
            this.classDescription = classDescription;
        }     
    }
}

export class GearViewModel {
    public gearScoreId: number = 0;
    public gearScoreBuildId: number = 0;
    public gearLabel: string = "";
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0
    public gearScore: number = 0;
    public gearBrackets: GearBracketsViewModel = new GearBracketsViewModel();

    constructor(gearScoreId?: number, gearScoreBuildId?: number, gearLabel?: string, ap?: number, aap?: number, dp?: number, gearScore?: number, gearBrackets?: GearBracketsViewModel) {
        if(gearScoreId) {
            this.gearScoreId = gearScoreId;
            this.gearScoreBuildId = gearScoreBuildId;
            this.gearLabel = gearLabel;
            this.ap = ap;
            this.aap = aap;
            this.dp = dp;
            this.gearScore = gearScore;
            this.gearBrackets = gearBrackets;
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

export class GearBracketsViewModel {
    public apBracket: string = "";
    public apBracketBonus: number = 0;
    public aapBracket: string = "";
    public aapBracketBonus: number = 0;
    public dpBracket: string = "";
    public dpBracketBonus: string = "";

    constructor(apBracket?: string, apBracketBonus?: number, aapBracket?: string, aapBracketBonus?: number, dpBracket?: string, dpBracketBonus?: string) {
        if(apBracket) {
            this.apBracket = apBracket;
            this.apBracketBonus = apBracketBonus;
            this.aapBracket = aapBracket;
            this.aapBracketBonus = aapBracketBonus;
            this.dpBracket = dpBracket;
            this.dpBracketBonus = dpBracketBonus;
        }
    }
}

export class BuildsViewModel {
    public combat: Array<GearViewModel> = new Array<GearViewModel>();
    public life: Array<GearViewModel> = new Array<GearViewModel>();
}