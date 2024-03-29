import { Injectable } from '@angular/core';
import { LocationNamesEnum, ServerNamesEnum, CombatTypesEnum, TimeAmountEnum } from './combatEnums';
import { UserClass } from './userClass';

@Injectable()
export class CombatPageData {
    public tableHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
    public tableData: Array<GrindingData> = new Array<GrindingData>();
    public visibleData: Array<VisibleData> = new Array<VisibleData>();
    public hasDefaultCombatHeaders: boolean = false;
    public activeClasses: Array<UserClass> = new Array<UserClass>();
    public hasMainClass: boolean = false;
}


@Injectable()
export class GrindingTableHeaders {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
    public isActive: boolean = false;
}

@Injectable()
export class GrindingData {
    public grindingId: number = 0;
    public classId: number = 0;
    public dateCreated: string = "";
    public grindLocation: LocationNamesEnum = new LocationNamesEnum();
    public timeAmount: TimeAmountEnum = new TimeAmountEnum();
    public trashLootAmount: number = 0;
    public userClass: UserClass = new UserClass();
    public server: ServerNamesEnum = new ServerNamesEnum();
    public combatType: CombatTypesEnum = new CombatTypesEnum();
    public afuaruSpawns: number = 0;
}

@Injectable()
export class VisibleData {
    public grindingId: number = 0;
    public dateCreated: string = "";
    public locationName: string = "";
    public timeAmount: string = "";
    public trashLootAmount: number = 0;
    public className: string = "";
    public serverName: string = "";
    public combatTypeName: string = "";
    public afuaruSpawns: number = 0;
}
