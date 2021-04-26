import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { ColumnHeadersHandler, CombatPageDataHandler, CombatPageEnumHandler, UserClassHandler } from '../middleware/combathandler';

export class CombatController {
    constructor(){}

        // GET
    public async getCombatData(): Promise<CombatPageDataViewModel> {
        return await new CombatPageDataHandler().getCombatData();
    } 

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        return await new CombatPageEnumHandler().getCombatEnums();
    } 

    public async getDefaultColumns(): Promise<Array<CombatHeadersViewModel>> {
        return await new ColumnHeadersHandler().getDefaultColumns();
    }

        // PUT
    public async updateSingleVisibleColumn(column: CombatHeadersViewModel): Promise<void> {
        await new ColumnHeadersHandler().updateSingleVisibleColumn(column);
        return;
    }
    
    public async updateCombatHeaders(combatHeaders: Array<CombatHeadersViewModel>): Promise<Array<CombatHeadersViewModel>> {
        return await new ColumnHeadersHandler().updateCombatHeaders(combatHeaders);
    }

        // POST
    public async addGrindingEntry(newEntry: GrindingDataViewModel, combatHeaders: Array<CombatHeadersViewModel>): Promise<VisibleDataViewModel> {
        return new CombatPageDataHandler().addEntry(newEntry, combatHeaders);
    }
} 