import { CombatPageDataViewModel } from '../../shared/viewModels/combatViewModels';
import { CombatPageDataHandler } from '../middleware/combathandler';

export class CombatController {
    private combatPageDataHandler: CombatPageDataHandler = new CombatPageDataHandler();
    constructor(){}

    public async getCombatData(): Promise<CombatPageDataViewModel> {
        return await this.combatPageDataHandler.getCombatData();
    } 

    // public async getCombatEnums(): Promise<CombatPageDataViewModel> {
    //     return await this.combatPageDataHandler.getCombatEnums();
    // } 
} 