import { Injectable } from '@angular/core';
import { Globals } from 'src/app/shared/classes/globals';
import { NavMenuViewModel, ThemeViewModel } from '../../../server/shared/viewModels/securityViewModels';
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

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        return await this.secRoute.getNavMenu();
    }
}