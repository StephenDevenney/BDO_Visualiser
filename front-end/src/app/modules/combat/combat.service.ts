import { Injectable } from '@angular/core';
import { Globals } from '../../shared/classes/globals';
import { APIService } from '../../shared/services/api.service';
import { GrindingTableHeaders } from './classes/grindingTable';

@Injectable()
export class CombatService {

    constructor(private http: APIService,
                private globals: Globals){

    }

    public getGrindingData() {
        return this.http.get(this.globals.config.appApiUrl + "combat/grinding-data");
    }

    public getDefaultColumns() {
        return this.http.get(this.globals.config.appApiUrl + "combat/column-defaults");
    }

    public getTotals() {
        return this.http.get(this.globals.config.appApiUrl + "combat/totals");
    }

    public getLocations() {
        return this.http.get(this.globals.config.appApiUrl + "shared/locations");
    }

    public getTrashLootTotals(locationId: number) {
        return this.http.get(this.globals.config.appApiUrl + "combat/trashloot-totals/" + locationId);
    }

    public saveCombatHeaders(combatHeaders: Array<GrindingTableHeaders>) {
        return this.http.put(this.globals.config.appApiUrl + "combat/active-columns", JSON.stringify(combatHeaders));
    }
}