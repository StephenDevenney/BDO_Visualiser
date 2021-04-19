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
    public locationId: number = 0;
    public locationName: string = "";
    public territoryId: number = 0;
    public territoryName: string = "";
    public recommendedAP: number = 0;
    public recommendedLevel: string = "";
    public timeId: number = 0;
    public timeAmount: number = 0;
    public userClassId: number = 0;
    public classId: number = 0;
    public className: string = "";
    public classDescription: string = "";
    public classRoleId: number = 0;
    public classRoleName: string = "";
    public gearScoreId: number = 0;
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0;
    public gearScore: number = 0;
    public serverId: number = 0;
    public serverDescription: string = "";
    public isElviaRealm: boolean = false;
    public combatTypeId: number = 0;
    public combatTypeName: string = "";
    public dateCreated: string = "";
    public trashLootAmount: number = 0;
    public afuaruSpawns: number = 0;

    constructor(grindingId?: number, locationId?: number, locationName?: string, territoryId?: number, territoryName?: string, timeId?: number, timeAmount?: number, userClassId?: number, classId?: number, className?: string, classRoleId?: number, classRoleName?: string, gearScoreId?: number, ap?: number, aap?: number, dp?: number, gearScore?: number, serverId?: number, serverDescription?: string, isElviaRealm?: boolean, combatTypeId?: number, combatTypeName?: string, trashLootAmount?: number, afuaruSpawns?: number) {
        if(grindingId) {
            this.grindingId = grindingId;
            this.locationId = locationId;
            this.locationName = locationName;
            this.territoryId = territoryId;
            this.territoryName = territoryName;
            this.timeId = timeId;
            this.timeAmount = timeAmount;
            this.userClassId = userClassId;
            this.classId = classId;
            this.className = className;
            this.classRoleId = classRoleId;
            this.classRoleName = classRoleName;
            this.gearScoreId = gearScoreId;
            this.ap = ap;
            this.aap = aap;
            this.dp = dp;
            this.gearScore = gearScore;
            this.serverId = serverId;
            this.serverDescription = serverDescription;
            this.isElviaRealm = isElviaRealm;
            this.combatTypeId = combatTypeId;
            this.combatTypeName = combatTypeName;
            this.trashLootAmount = trashLootAmount;
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

export class TerritoryEnumEntity {
    public territoryId: number = 1;
    public territoryName: string = "-";

    constructor(territoryId?: number, territoryName?: string) {
        if(territoryId) {
            this.territoryId = territoryId;
            this.territoryName = territoryName;
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
    public serverName: string = "-";
    public isElviaRealm: boolean = false;

    constructor(serverId?: number, serverName?: string, isElviaRealm?: boolean) {
        if(serverId) {
            this.serverId = serverId;
            this.serverName = serverName;
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
    public FK_gearScoreId: number = 0;
    public className: string = "";
    public classRole: string = "";
    public combatTypeName: string = "";
    public dateCreated: string = "";
    public classDescription: string = "";
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0;
    public gearScore: number = 0;

    constructor(classId?: number, FK_gearScoreId?: number, className?: string, classRole?: string, combatTypeName?: string, dateCreated?: string, classDescription?: string, ap?: number, aap?: number, dp?: number, gearScore?: number) {
        if(classId) {
            this.classId = classId;
            this.FK_gearScoreId = FK_gearScoreId;
            this.className = className;
            this.classRole = classRole;
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