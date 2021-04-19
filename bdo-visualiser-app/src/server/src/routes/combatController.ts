import { CombatPageDataViewModel, CombatPageEnumsViewModel } from '../../shared/viewModels/combatViewModels';
import { CombatPageDataHandler, CombatPageEnumHandler } from '../middleware/combathandler';

export class CombatController {
    private combatPageDataHandler: CombatPageDataHandler = new CombatPageDataHandler();
    private combatPageEnumHandler: CombatPageEnumHandler = new CombatPageEnumHandler();
    constructor(){}

    public async getCombatData(): Promise<CombatPageDataViewModel> {
        return await this.combatPageDataHandler.getCombatData();
    } 

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        return await this.combatPageEnumHandler.getCombatEnums();
    } 
} 