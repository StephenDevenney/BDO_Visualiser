
import { NavMenuHandler } from '../middleware/securityHandler';
import { NavMenuViewModel } from '../../shared/viewModels/securityViewModels';

export class SecurityController {
    private navMenu: NavMenuHandler = new NavMenuHandler();
    constructor(){}

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        return await this.navMenu.getNavMenu();
    } 
} 