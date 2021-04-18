export class CombatSettingsEntity {
    public settingsId: number = 0;
    public FK_combatSettingsId: number = 0;
    public FK_currentGearScoreId: number = 0;
    public FK_redBattleFieldId: number = 0;
    public FK_appleSecsId: number = 0;
    public FK_themeId: number = 0;
    public hasDefaultCombatHeaders: boolean = false;
    public navMinimised: boolean = false;
}

// Combat
export class CombatPageDataEntity {
    public tableHeaders: Array<GrindingTableHeadersEntity> = new Array<GrindingTableHeadersEntity>();
    public tableData: Array<GrindingDataEntity> = new Array<GrindingDataEntity>();
    public visibleData: Array<VisibleDataEntity> = new Array<VisibleDataEntity>();
    public hasDefaultCombatHeaders: boolean = false;
    public activeClasses: Array<UserClassEntity> = new Array<UserClassEntity>();
    public hasMainClass: boolean = false;

    constructor(tableHeaders?: Array<GrindingTableHeadersEntity>, tableData?: Array<GrindingDataEntity>, visibleData?: Array<VisibleDataEntity>, hasDefaultCombatHeaders?: boolean, activeClasses?: Array<UserClassEntity>, hasMainClass?: boolean) {
        if(tableHeaders) {
            this.tableHeaders = tableHeaders;
            this.tableData = tableData;
            this.visibleData = visibleData;
            this.hasDefaultCombatHeaders = hasDefaultCombatHeaders;
            this.activeClasses = activeClasses;
            this.hasMainClass = hasMainClass;
        }
    }
}


export class GrindingTableHeadersEntity {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
    public isActive: boolean = false;

    constructor(headingId?: number, field?: string, header?: string, isActive?: boolean) {
        if(headingId) {
            this.headingId = headingId;
            this.field = field;
            this.header = header;
            this.isActive = isActive;
        }
    }
}

export class GrindingDataEntity {
    public grindingId: number = 0;
    public classId: number = 0;
    public dateCreated: string = "";
    public grindLocation: LocationNamesEnumEntity = new LocationNamesEnumEntity();
    public timeAmount: TimeAmountEnumEntity = new TimeAmountEnumEntity();
    public trashLootAmount: number = 0;
    public userClass: UserClassEntity = new UserClassEntity();
    public server: ServerNamesEnumEntity = new ServerNamesEnumEntity();
    public combatType: CombatTypesEnumEntity = new CombatTypesEnumEntity();
    public afuaruSpawns: number = 0;

    constructor(grindingId?: number, classId?: number, dateCreated?: string, grindLocation?: LocationNamesEnumEntity, timeAmount?: TimeAmountEnumEntity, trashLootAmount?: number, userClass?: UserClassEntity, server?: ServerNamesEnumEntity, combatType?: CombatTypesEnumEntity, afuaruSpawns?: number) {
        if(grindingId) {
            this.grindingId = grindingId;
            this.classId = classId;
            this.dateCreated = dateCreated;
            this.grindLocation = grindLocation;
            this.timeAmount = timeAmount;
            this.trashLootAmount = trashLootAmount;
            this.userClass = userClass;
            this.server = server;
            this.combatType = combatType;
            this.afuaruSpawns = afuaruSpawns;
        }
    }
}

export class VisibleDataEntity {
    public grindingId: number = 0;
    public dateCreated: string = "";
    public locationName: string = "";
    public timeAmount: string = "";
    public trashLootAmount: number = 0;
    public className: string = "";
    public serverName: string = "";
    public combatTypeName: string = "";
    public afuaruSpawns: number = 0;

    constructor(grindingId?: number, dateCreated?: string, locationName?: string, timeAmount?: string, trashLootAmount?: number, className?: string, serverName?: string, combatTypeName?: string, afuaruSpawns?: number) {
        this.grindingId = grindingId;
        this.dateCreated = dateCreated;
        this.locationName = locationName;
        this.timeAmount = timeAmount;
        this.trashLootAmount = trashLootAmount;
        this.className = className;
        this.serverName = serverName;
        this.combatTypeName = combatTypeName;
        this.afuaruSpawns = afuaruSpawns;
    }
}

// Enums
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

export class LocationNamesEnumEntity {
    public locationId: number = 1;
    public territoryId: number = 1;
    public locationName: string = "-";
    public territoryName: string = "-";
    public recommendedLevel: string = "";
    public recommendedAP: string = "";

    constructor(locationId?: number, territoryId?: number, locationName?: string, territoryName?: string, recommendedLevel?: string, recommendedAP?: string) {
        if(locationId) {
            this.locationId = locationId;
            this.territoryId = territoryId;
            this.locationName = locationName;
            this.territoryName = territoryName;
            this.recommendedLevel = recommendedLevel;
            this.recommendedAP = recommendedAP; 
        }
    }
}

export class LocationNamesGroupedEnumEntity {
    public label: string = "-";
    public items: Array<LocationNamesEnumEntity> = new Array<LocationNamesEnumEntity>();

    constructor(label?: string, items?: Array<LocationNamesEnumEntity>) {
        if(label) {
            this.label = label;
            this.items = items;
        }
    }
}

export class ServerNamesEnumEntity {
    public serverId: number = 1;
    public serverDescription: string = "-";
    public isElviaRealm: boolean = false;

    constructor(serverId?: number, serverDescription?: string, isElviaRealm?: boolean) {
        if(serverId) {
            this.serverId = serverId;
            this.serverDescription = serverDescription;
            this.isElviaRealm = isElviaRealm;
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

export class TimeAmountEnumEntity {
    public timeId: number = 1;
    public timeAmount: number = 60;

    constructor(timeId?: number, timeAmount?: number) {
        if(timeId) {
            this.timeId = timeId;
            this.timeAmount = timeAmount;
        } 
    }
}

export class CombatPageEnumsEntity {
    public classNamesEnum: Array<ClassNamesEnumEntity> = new Array<ClassNamesEnumEntity>();
    public locationNamesEnum: Array<LocationNamesGroupedEnumEntity> = new Array<LocationNamesGroupedEnumEntity>();
    public serverNamesEnum: Array<ServerNamesEnumEntity> = new Array<ServerNamesEnumEntity>();
    public combatTypesEnum: Array<CombatTypesEnumEntity> = new Array<CombatTypesEnumEntity>();
    public timeAmountEnum: Array<TimeAmountEnumEntity> = new Array<TimeAmountEnumEntity>();

    constructor(classNamesEnum?: Array<ClassNamesEnumEntity>, locationNamesEnum?: Array<LocationNamesGroupedEnumEntity>, serverNamesEnum?: Array<ServerNamesEnumEntity>, combatTypesEnum?: Array<CombatTypesEnumEntity>, timeAmountEnum?: Array<TimeAmountEnumEntity>) {
        if(classNamesEnum) {
            this.classNamesEnum = classNamesEnum;
            this.locationNamesEnum = locationNamesEnum;
            this.serverNamesEnum = serverNamesEnum;
            this.combatTypesEnum = combatTypesEnum;
            this.timeAmountEnum = timeAmountEnum;
        }    
    }
}

// User Class & Gear
export class UserClassEntity {
    public classId: number = 0;
    public className: string = "";
    public classRole: string = "";
    public primaryCombatTypeDescription: string = "";
    public gear: GearEntity = new GearEntity();
    public description: string = "";

    constructor(classId?: number, className?: string, classRole?: string, primaryCombatTypeDescription?: string, gear?: GearEntity, description?: string) {
        if(classId) {
            this.classId = classId;
            this.className = className;
            this.classRole = classRole;
            this.primaryCombatTypeDescription = primaryCombatTypeDescription;
            this.gear = gear;
            this.description = description;
        }     
    }
}

export class GearEntity {
    public gearScoreId: number = 0;
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0
    public gearScore: number = 0;

    constructor(gearScoreId?: number, ap?: number, aap?: number, dp?: number, gearScore?: number) {
        if(gearScoreId) {
            this.gearScoreId = gearScoreId;
            this.ap = ap;
            this.aap = aap;
            this.dp = dp;
            this.gearScore = gearScore;
        }   
    }
}