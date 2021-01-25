import { Injectable } from '@angular/core';

@Injectable()
export class GrindingTable {
    public tableHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
    public tableData: Array<GrindingData> = new Array<GrindingData>();
}


@Injectable()
export class GrindingTableHeaders {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
}

@Injectable()
export class GrindingData {
    public grindingId: number = 0;
    public trashLoot: string = "";
    public date: string = "";
    public time: string = "";
    public class: string = "";
    public location: string = "";
    public server: string = "";
    public combatType: string = "";
    public gearScore: number = 0;
    public afuaruSpawns: number = 0;
}
