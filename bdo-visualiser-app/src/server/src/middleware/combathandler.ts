import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';
import { NavMenuEntity } from 'src/server/shared/entities/securityEntities';
import { CombatSettingsEntity } from 'src/server/shared/entities/combatEntities';
import { CombatSettingsContext } from '../sqlContext/combatContext';
import { CombatPageDataViewModel } from 'src/server/shared/viewModels/combatViewModels';

export class CombatHandler {
    public combatSettingsContext: CombatSettingsContext = new CombatSettingsContext();

    // public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
    //     let nmvm = new Array<NavMenuViewModel>();
    //     await this.navMenu.getAll().then((_ : Array<NavMenuEntity>) => {
    //         _.forEach(row => {
    //             nmvm.push(new NavMenuViewModel(row.navName,  row.navTitle, row.navRoute));
    //         });
    //     });
    //     return nmvm;
    // }

    public async getCombatData(): Promise<CombatPageDataViewModel> {
        let cpdvm = new CombatPageDataViewModel();
        let cse = await this.combatSettingsContext.get();

    //     var tableHeadersEntites = sqlContext.getCombatTableHeaders(combatSettings.combatSettingsId);
    // var tableHeaders = [];
    // await Promise.all(tableHeadersEntites.map(async (col) => {
    //     var headerVM = CombatHeaders.convertToVM(col);
    //     tableHeaders.push(headerVM);
    // }));

        return cpdvm;
    }
}