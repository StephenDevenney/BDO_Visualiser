import { Injectable } from '@angular/core';
import { ThemeViewModel } from '../../../server/shared/viewModels/securityViewModels';
import { SecurityController } from '../../../server/src/routes/securityController';

@Injectable()
export class PageService {

    constructor(private secRoute: SecurityController){}

    public async getThemes(): Promise<Array<ThemeViewModel>> {
        return await this.secRoute.getThemes();
    }

    // public saveProfile(): Promise<any> {
    //     return this.http.put(this.globals.config.appApiUrl + "security/config-settings", JSON.stringify(this.globals.config)).toPromise();
    // }

    // public saveSettings() {
    //     return this.http.get(this.globals.config.appApiUrl + "security/grinding-data")
    // }
}