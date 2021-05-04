import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, CombatStatsByLocationViewModel, CombatStatsViewModel, GrindingDataViewModel, LocationNamesEnumViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { ColumnHeadersHandler, CombatPageDataHandler, CombatPageNewEntryHandler, CombatStatsTabHandler } from '../middleware/combathandler';

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

    public async getStatsData(): Promise<CombatStatsViewModel> {
        return await new CombatStatsTabHandler().getCombatStats();
    }

    public async getStatsDataByLocation(locationEnum: LocationNamesEnumViewModel): Promise<CombatStatsByLocationViewModel> {
        return await new CombatStatsTabHandler().getCombatStatsByLocation(locationEnum);
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