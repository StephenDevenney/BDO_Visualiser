import { Injectable } from '@angular/core';
import { Globals } from '../../shared/classes/globals';
import { APIService } from '../../shared/services/api.service';
import { UserClass } from './classes/userClass';
import { GrindingData, GrindingTableHeaders } from './classes/grindingTable';

@Injectable()
export class CombatService {

    constructor(private http: APIService,
                private globals: Globals){

    }

    public getCombatPageData() {
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

    public saveCombatHeaders(combatHeaders: Array<GrindingTableHeaders>): Promise<any> {
        return this.http.put(this.globals.config.appApiUrl + "combat/active-columns", JSON.stringify(combatHeaders)).toPromise();
    }

    public getAllClassNames() {
        return this.http.get(this.globals.config.appApiUrl + "combat/class-names");
    }

    public getMainClass(): Promise<any> {
        return this.http.get(this.globals.config.appApiUrl + "combat/main-class").toPromise();
    }

    public addMainClass(classToSave: UserClass) {
        return this.http.post(this.globals.config.appApiUrl + "combat/create-main-class", JSON.stringify(classToSave));
    }

    public getCombatEnums() {
        return this.http.get(this.globals.config.appApiUrl + "combat/enums");
    }

    public saveGrindingEntry(newEntry: GrindingData): Promise<any> {
        return this.http.post(this.globals.config.appApiUrl + "combat/new-entry", JSON.stringify(newEntry)).toPromise();
    }
}