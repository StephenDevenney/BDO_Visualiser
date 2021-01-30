import { Injectable } from '@angular/core';

@Injectable()
export class CombatTotals {
    public total: Total = new Total;
    // public tableData: Array<GrindingData> = new Array<GrindingData>();
}


@Injectable()
export class Total {
    public trashLootAmount: number = 0;
    public afuaruSpawns: number = 0;
    public timeAmount: number = 0;
}

@Injectable()
export class TotalDay {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
}

@Injectable()
export class TotalWeek {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
}

@Injectable()
export class totalMonth {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
}

@Injectable()
export class TotalYear {
    public headingId: number = 0;
    public field: string = "";
    public header: string = "";
}