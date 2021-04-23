
import { NavMenuHandler, SecuritySettingsHandler, ThemesHandler } from '../middleware/securityHandler';
import { ConfigViewModel, NavMenuViewModel, SecuritySettingsViewModel, ThemeViewModel } from '../../shared/viewModels/securityViewModels';

export class SecurityController {
    private navMenu: NavMenuHandler = new NavMenuHandler();
    private securitySettingsHandler: SecuritySettingsHandler = new SecuritySettingsHandler();
    private themesHandler: ThemesHandler = new ThemesHandler();
    constructor(){}

        // GET
    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        return await this.navMenu.getNavMenu();
    } 

    public async getSecuritySettings(): Promise<SecuritySettingsViewModel> {
        return await this.securitySettingsHandler.getSecuritySettings();
    } 

    public async getThemes(): Promise<Array<ThemeViewModel>> {
        return await this.themesHandler.getThemes();
    } 

        // PUT
    public async saveConfigSettings(config: ConfigViewModel): Promise<void> {
        await this.securitySettingsHandler.saveConfigSettings(config);
        return;
    } 
} 