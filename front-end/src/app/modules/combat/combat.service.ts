import { Injectable } from '@angular/core';
import { Globals } from '../../shared/classes/globals';
import { APIService } from '../../shared/services/api.service';

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
}