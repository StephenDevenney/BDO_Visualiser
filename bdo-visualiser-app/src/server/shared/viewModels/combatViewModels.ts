import { ClassNamesEnumViewModel, CombatTypesEnumViewModel, UserClassViewModel } from "./userClassViewModel";

export class CombatPageDataViewModel {
    public tableHeaders: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
    public tableData: Array<GrindingDataViewModel> = new Array<GrindingDataViewModel>();
    public visibleData: Array<VisibleDataViewModel> = new Array<VisibleDataViewModel>();
    public hasDefaultCombatHeaders: boolean = false;
    public activeClasses: Array<UserClassViewModel> = new Array<UserClassViewModel>();
    public hasMainClass: boolean = true;

    constructor(tableHeaders?: Array<CombatHeadersViewModel>, tableData?: Array<GrindingDataViewModel>, visibleData?: Array<VisibleDataViewModel>, hasDefaultCombatHeaders?: boolean, activeClasses?: Array<UserClassViewModel>, hasMainClass?: boolean) {
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

export class GrindingDataViewModel {
    public grindingId: number = 0;
    public classId: number = 0;
    public dateCreated: string = "";
    public grindLocation: LocationNamesEnumViewModel = new LocationNamesEnumViewModel();
    public timeAmount: TimeAmountEnumViewModel = new TimeAmountEnumViewModel();
    public trashLootAmount: number = 0;
    public userClass: UserClassViewModel = new UserClassViewModel();
    public server: ServerNamesEnumViewModel = new ServerNamesEnumViewModel();
    public combatType: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();
    public afuaruSpawns: number = 0;

    constructor(grindingId?: number, classId?: number, dateCreated?: string, grindLocation?: LocationNamesEnumViewModel, timeAmount?: TimeAmountEnumViewModel, trashLootAmount?: number, userClass?: UserClassViewModel, server?: ServerNamesEnumViewModel, combatType?: CombatTypesEnumViewModel, afuaruSpawns?: number) {
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

export class VisibleDataViewModel {
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

export class CombatHeadersViewModel {
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

export class LocationNamesEnumViewModel {
    public locationId: number = 1;
    public territoryId: number = 1;
    public locationName: string = "-";
    public territoryName: string = "-";
    public recommendedLevel: string = "";
    public recommendedAP: number = 0;

    constructor(locationId?: number, territoryId?: number, locationName?: string, territoryName?: string, recommendedLevel?: string, recommendedAP?: number) {
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

export class LocationNamesGroupedEnumViewModel {
    public label: string = "-"; // Group Header
    public items: Array<LocationNamesEnumViewModel> = new Array<LocationNamesEnumViewModel>();

    constructor(label?: string, items?: Array<LocationNamesEnumViewModel>) {
        if(label) {
            this.label = label;
            this.items = items;
        }
    }
}

export class ServerNamesEnumViewModel {
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

export class TimeAmountEnumViewModel {
    public timeId: number = 1;
    public timeAmount: number = 60;

    constructor(timeId?: number, timeAmount?: number) {
        if(timeId) {
            this.timeId = timeId;
            this.timeAmount = timeAmount;
        } 
    }
}

export class CombatPageEnumsViewModel {
    public classNamesEnum: Array<ClassNamesEnumViewModel> = new Array<ClassNamesEnumViewModel>();
    public locationNamesEnum: Array<LocationNamesGroupedEnumViewModel> = new Array<LocationNamesGroupedEnumViewModel>();
    public serverNamesEnum: Array<ServerNamesEnumViewModel> = new Array<ServerNamesEnumViewModel>();
    public combatTypesEnum: Array<CombatTypesEnumViewModel> = new Array<CombatTypesEnumViewModel>();
    public timeAmountEnum: Array<TimeAmountEnumViewModel> = new Array<TimeAmountEnumViewModel>();
    public previousCombatValuesViewModel: PreviousCombatValuesViewModel = new PreviousCombatValuesViewModel();

    constructor(classNamesEnum?: Array<ClassNamesEnumViewModel>, locationNamesEnum?: Array<LocationNamesGroupedEnumViewModel>, serverNamesEnum?: Array<ServerNamesEnumViewModel>, combatTypesEnum?: Array<CombatTypesEnumViewModel>, timeAmountEnum?: Array<TimeAmountEnumViewModel>, previousCombatValuesViewModel?: PreviousCombatValuesViewModel) {
        if(classNamesEnum) {
            this.classNamesEnum = classNamesEnum;
            this.locationNamesEnum = locationNamesEnum;
            this.serverNamesEnum = serverNamesEnum;
            this.combatTypesEnum = combatTypesEnum;
            this.timeAmountEnum = timeAmountEnum;
            this.previousCombatValuesViewModel = previousCombatValuesViewModel;
        }    
    }
}

export class PreviousCombatValuesViewModel {
    public userClass: UserClassViewModel = new UserClassViewModel();
    public grindLocation: LocationNamesEnumViewModel = new LocationNamesEnumViewModel();
    public timeAmount: TimeAmountEnumViewModel = new TimeAmountEnumViewModel();
    public server: ServerNamesEnumViewModel = new ServerNamesEnumViewModel();
    public combatType: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();

    constructor(userClass?: UserClassViewModel, grindLocation?: LocationNamesEnumViewModel, timeAmount?: TimeAmountEnumViewModel, server?: ServerNamesEnumViewModel, combatType?: CombatTypesEnumViewModel) {
        if(userClass) {
            this.userClass = userClass;
            this.grindLocation = grindLocation;
            this.timeAmount = timeAmount;
            this.server = server;
            this.combatType = combatType;
        }
    }
}