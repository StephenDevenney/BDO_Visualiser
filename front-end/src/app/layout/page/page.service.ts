import { Injectable } from '@angular/core';
import { Globals } from '../../shared/classes/globals';
import { APIService } from '../../shared/services/api.service';

@Injectable()
export class PageService {

    constructor(private http: APIService,
                private globals: Globals){

    }

    public getThemes() {
        return this.http.get(this.globals.config.appApiUrl + "security/themes")
    }

    public saveProfile() {
        return this.http.put(this.globals.config.appApiUrl + "security/config-settings", JSON.stringify(this.globals.config));
    }

    // public saveSettings() {
    //     return this.http.get(this.globals.config.appApiUrl + "security/grinding-data")
    // }
}