import { Injectable, Injector } from '@angular/core';
import { CombatPageEnumsViewModel } from 'src/server/shared/viewModels/combatViewModels';
import { CombatController } from 'src/server/src/routes/combatController';
import { SecuritySettingsViewModel } from '../../../server/shared/viewModels/securityViewModels';
import { SecurityController } from '../../../server/src/routes/securityController';
import { Globals } from '../classes/globals';

@Injectable()
export class APIService {
    constructor(private globals: Globals,
                private secRoute: SecurityController,
                private combatRoute: CombatController) {
                
    }

    public async loadSecuritySettings(): Promise<any> {
        await this.secRoute.getSecuritySettings().catch((err: any) => {
            this.globals.seriousErrorMessage = err;
        }).then((res: SecuritySettingsViewModel) => {
            this.globals.isSignedIn = res.isSignedIn;
            this.globals.config = res.config;
            this.globals.user = res.user;
            console.log(this.globals);
        });
    }

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        return await this.combatRoute.getCombatEnums();
    }
}