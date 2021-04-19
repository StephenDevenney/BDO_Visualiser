import { Injectable } from '@angular/core';
import { Globals } from 'src/app/shared/classes/globals';
import { ThemeViewModel } from '../../../server/shared/viewModels/securityViewModels';
import { SecurityController } from '../../../server/src/routes/securityController';

@Injectable()
export class PageService {

    constructor(private secRoute: SecurityController,
                private globals: Globals){}

    public async getThemes(): Promise<Array<ThemeViewModel>> {
        return await this.secRoute.getThemes();
    }

    public async saveConfigSettings(): Promise<void> {
        return await this.secRoute.saveConfigSettings(this.globals.config);
    }

    // public saveSettings() {
    //     return this.http.get(this.globals.config.appApiUrl + "security/grinding-data")
    // }
}