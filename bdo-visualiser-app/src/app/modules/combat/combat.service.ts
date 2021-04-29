import { Injectable } from '@angular/core';
import { CombatHeadersViewModel, CombatPageDataViewModel } from '../../../server/shared/viewModels/combatViewModels';
import { CombatController } from '../../../server/src/routes/combatController';

@Injectable()
export class CombatService {
    constructor(private combatRoute: CombatController){}

        // GET
    public async getCombatPageData(): Promise<CombatPageDataViewModel> {
        return await this.combatRoute.getCombatData();
    }

        // PUT
    public async saveCombatHeaders(fullHeaders: boolean): Promise<void> {
        await this.combatRoute.toggleFullHeaders(fullHeaders);
        return;
    }

    public async saveSingleCombatHeader(column: CombatHeadersViewModel): Promise<void> {
        await this.combatRoute.updateSingleVisibleColumn(column);
        return;
    }
}