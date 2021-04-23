import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, UserClassViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { ColumnHeadersHandler, CombatPageDataHandler, CombatPageEnumHandler, UserClassHandler } from '../middleware/combathandler';

export class CombatController {
    private combatPageDataHandler: CombatPageDataHandler = new CombatPageDataHandler();
    private combatPageEnumHandler: CombatPageEnumHandler = new CombatPageEnumHandler();
    private columnHeadersHandler: ColumnHeadersHandler = new ColumnHeadersHandler();
    constructor(){}

        // GET
    public async getCombatData(): Promise<CombatPageDataViewModel> {
        return await this.combatPageDataHandler.getCombatData();
    } 

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        return await this.combatPageEnumHandler.getCombatEnums();
    } 

    public async getDefaultColumns(): Promise<Array<CombatHeadersViewModel>> {
        return await this.columnHeadersHandler.getDefaultColumns();
    }

        // PUT
    public async updateSingleVisibleColumn(column: CombatHeadersViewModel): Promise<void> {
        await this.columnHeadersHandler.updateSingleVisibleColumn(column);
        return;
    }
    
    public async updateCombatHeaders(combatHeaders: Array<CombatHeadersViewModel>): Promise<Array<CombatHeadersViewModel>> {
        return await this.columnHeadersHandler.updateCombatHeaders(combatHeaders);
    }

        // POST
    public async addMainUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        userClass.classRole = "Main";
        return this.addUserClass(userClass);
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await new UserClassHandler().addUserClass(userClass);
    }

    public async addGrindingEntry(newEntry: GrindingDataViewModel, combatHeaders: Array<CombatHeadersViewModel>): Promise<VisibleDataViewModel> {
        return new CombatPageDataHandler().addEntry(newEntry, combatHeaders);
    }
} 