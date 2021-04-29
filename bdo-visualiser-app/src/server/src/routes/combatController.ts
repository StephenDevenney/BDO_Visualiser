import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { ColumnHeadersHandler, CombatPageDataHandler, CombatPageNewEntryHandler } from '../middleware/combathandler';

export class CombatController {
    constructor(){}

        // GET
    public async getCombatData(): Promise<CombatPageDataViewModel> {
        return await new CombatPageDataHandler().getCombatData();
    } 

    public async getCombatNewEntryData(): Promise<CombatPageEnumsViewModel> {
        return await new CombatPageNewEntryHandler().getCombatNewEntryData();
    } 

    public async getDefaultColumns(): Promise<Array<CombatHeadersViewModel>> {
        return await new ColumnHeadersHandler().getDefaultColumns();
    }

        // PUT
    public async updateSingleVisibleColumn(column: CombatHeadersViewModel): Promise<void> {
        await new ColumnHeadersHandler().updateSingleVisibleColumn(column);
        return;
    }
    
    public async toggleFullHeaders(fullHeaders: boolean): Promise<void> {
        return await new ColumnHeadersHandler().toggleFullHeaders(fullHeaders);
    }

        // POST
    public async addGrindingEntry(newEntry: GrindingDataViewModel, combatHeaders: Array<CombatHeadersViewModel>): Promise<VisibleDataViewModel> {
        return new CombatPageDataHandler().addEntry(newEntry, combatHeaders);
    }
} 