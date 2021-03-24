import { Injectable } from '@angular/core';
import { UserClass } from './userClass';

@Injectable()
export class CombatPageData {
    public tableHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
    public tableData: Array<GrindingData> = new Array<GrindingData>();
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
    public date: string = "";
    public locationName: string = "";
    public timeAmount: number = 0;
    public trashLootAmount: number = 0;
    public className: string = "";
    public serverName: string = "";
    public combatTypeName: string = "";
    public afuaruSpawns: number = 0;
}
