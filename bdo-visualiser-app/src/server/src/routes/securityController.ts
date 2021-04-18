
import { NavMenuHandler } from '../middleware/securityHandler';
import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';

export class SecurityController {
    public navMenu: NavMenuHandler = new NavMenuHandler();
    constructor(){}

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        return await this.navMenu.getNavMenu();
    } 
} 