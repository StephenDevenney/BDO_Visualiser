import { Injectable } from '@angular/core';
import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, UserClassViewModel } from '../../../server/shared/viewModels/combatViewModels';
import { CombatController } from '../../../server/src/routes/combatController';

@Injectable()
export class CombatService {
    constructor(private combatRoute: CombatController){}

        // GET
    public async getCombatPageData(): Promise<CombatPageDataViewModel> {
        return await this.combatRoute.getCombatData();
    }

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        return await this.combatRoute.getCombatEnums();
    }

        // PUT
    public async saveCombatHeaders(columns: Array<CombatHeadersViewModel>): Promise<Array<CombatHeadersViewModel>> {
        return await this.combatRoute.updateCombatHeaders(columns);
    }

    public async saveSingleCombatHeader(column: CombatHeadersViewModel): Promise<void> {
        await this.combatRoute.updateSingleVisibleColumn(column);
        return;
    }

        // POST
    public async addMainUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await this.combatRoute.addMainUserClass(userClass);
    }
}