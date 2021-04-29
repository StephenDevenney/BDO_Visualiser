import { Injectable, Injector } from '@angular/core';
import { CombatHeadersViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, VisibleDataViewModel } from 'src/server/shared/viewModels/combatViewModels';
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

    public async getCombatNewEntryData(): Promise<CombatPageEnumsViewModel> {
        return await this.combatRoute.getCombatNewEntryData();
    }

    public async saveSingleCombatHeader(column: CombatHeadersViewModel): Promise<void> {
       await this.combatRoute.updateSingleVisibleColumn(column);
       return;
    }

    public async addGrindingEntry(newEntry: GrindingDataViewModel, combatHeaders: Array<CombatHeadersViewModel>): Promise<VisibleDataViewModel> {
        return await this.combatRoute.addGrindingEntry(newEntry, combatHeaders);
    }
}