import { ClassNamesEnumEntity, CombatTypesEnumEntity } from "./userClassEntities";

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
    public locationId: number = 1;
    public locationName: string = "-";
    public territoryId: number = 1;
    public territoryName: string = "-";
    public recommendedAP: number = 0;
    public recommendedLevel: string = "";
    public timeId: number = 1;
    public timeAmount: number = 60;
    public userClassId: number = 0;
    public classNameId: number = 0;
    public className: string = "";
    public fileName: string = "";
    public classDescription: string = "";
    public classRoleId: number = 0;
    public classRoleName: string = "";
    public gearScoreId: number = 0;
    public gearLabel: string = "";
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0;
    public gearScore: number = 0;
    public serverId: number = 1;
    public serverDescription: string = "-";
    public isElviaRealm: boolean = false;
    public combatTypeId: number = 1;
    public combatTypeName: string = "-";
    public agrisId: number = 1;
    public agrisAmount: number = 0;
    public agrisDayDescription: string = "";
    public dateCreated: string = "";
    public trashLootAmount: number = 0;
    public afuaruSpawns: number = 0;
    public afuaruSpawnable: boolean = false;

    constructor(grindingId?: number, locationId?: number, locationName?: string, territoryId?: number, territoryName?: string, timeId?: number, timeAmount?: number, userClassId?: number, classNameId?: number, className?: string, fileName?: string, classRoleId?: number, classRoleName?: string, gearScoreId?: number, gearLabel?: string, ap?: number, aap?: number, dp?: number, gearScore?: number, serverId?: number, serverDescription?: string, isElviaRealm?: boolean, combatTypeId?: number, combatTypeName?: string, trashLootAmount?: number, afuaruSpawns?: number, afuaruSpawnable?: boolean) {
        if(grindingId) {
            this.grindingId = grindingId;
            this.locationId = locationId;
            this.locationName = locationName;
            this.territoryId = territoryId;
            this.territoryName = territoryName;
            this.timeId = timeId;
            this.timeAmount = timeAmount;
            this.userClassId = userClassId;
            this.classNameId = classNameId;
            this.className = className;
            this.fileName = fileName;
            this.classRoleId = classRoleId;
            this.classRoleName = classRoleName;
            this.gearScoreId = gearScoreId;
            this.gearLabel = gearLabel;
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
            this.afuaruSpawnable = afuaruSpawnable;
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

export class CombatHeadersEntity {
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
    public afuaruSpawnable: boolean = false;
    public locationCount: number = 0;

    constructor(locationId?: number, territoryId?: number, locationName?: string, territoryName?: string, recommendedLevel?: string, recommendedAP?: string, afuaruSpawnable?: boolean, locationCount?: number) {
        if(locationId) {
            this.locationId = locationId;
            this.territoryId = territoryId;
            this.locationName = locationName;
            this.territoryName = territoryName;
            this.recommendedLevel = recommendedLevel;
            this.recommendedAP = recommendedAP; 
            this.afuaruSpawnable = afuaruSpawnable;
        }

        if(locationCount) 
            this.locationCount = locationCount;
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
    public serverCount: number = 0

    constructor(serverId?: number, serverName?: string, isElviaRealm?: boolean, serverCount?: number) {
        if(serverId) {
            this.serverId = serverId;
            this.serverName = serverName;
            this.isElviaRealm = isElviaRealm;
        }  
        if(serverCount)
            this.serverCount = serverCount;
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

export class AgrisEnumEntity {
    public agrisId: number = 1;
    public agrisAmount: number = 0;
    public agrisDayDescription: string = "";

    constructor(agrisId?: number, agrisAmount?: number, agrisDayDescription?: string) {
        if(agrisId) {
            this.agrisId = agrisId;
            this.agrisAmount = agrisAmount;
            this.agrisDayDescription = agrisDayDescription;
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

export class CombatStatsEntity {
    public trashLootAmount: number = 0;
    public afuaruSpawns: number = 0;
    public timeAmount: number = 0;

    constructor (trashLootAmount?: number, afuaruSpawns?: number, timeAmount?: number) {
        if(trashLootAmount) {
            this.timeAmount = trashLootAmount;
            this.afuaruSpawns = afuaruSpawns;
            this.timeAmount = timeAmount;
        }
    }
}

export class HoursStatsEntity {
    public hoursDay: number = 0;
    public hoursMonth: number = 0;
    public hoursYear: number = 0;
    public hoursTotal: number = 0;
}