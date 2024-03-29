import { NavMenuContext, SecuritySettingsContext, ThemesContext } from '../sqlContext/securityContext';
import { AppUserViewModel, ConfigViewModel, NavMenuViewModel, SecuritySettingsViewModel, ThemeViewModel } from '../../shared/viewModels/securityViewModels';
import { NavMenuEntity, SecuritySettingsEntity, ThemeEntity } from '../../shared/entities/securityEntities';

export class NavMenuHandler {
        
    private navMenu: NavMenuContext = new NavMenuContext();

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        let nmvm = new Array<NavMenuViewModel>();
        await this.navMenu.getAll().then((_ : Array<NavMenuEntity>) => {
            _.forEach(row => {
                nmvm.push(new NavMenuViewModel(row.navMenuId, row.navName,  row.navTitle, row.navRoute));
            });
        });
        return nmvm;
    }
}

export class SecuritySettingsHandler {
    public async getSecuritySettings(): Promise<SecuritySettingsViewModel> { 
        let securitySettings: SecuritySettingsViewModel;
        await new SecuritySettingsContext().get().then(async (_ : SecuritySettingsEntity) => {        
            let user = new AppUserViewModel(_.userId, _.userName, _.userRoleId);
            let theme = new ThemeViewModel(_.themeId, _.themeName, _.themeClassName);
            let previousPage = await new NavMenuContext().get(_.previousPageId);       
            let config = new ConfigViewModel(theme, _.navMinimised, _.idleTime, previousPage);
            
            securitySettings = new SecuritySettingsViewModel(user, true, config);
        });

        return securitySettings;
    }

    public async saveConfigSettings(config: ConfigViewModel): Promise<void> {
        await new SecuritySettingsContext().update(config.theme.themeId, config.navMinimised, config.previousPage.navMenuId);
        return;
    }
}

export class ThemesHandler {
    private themesContext: ThemesContext = new ThemesContext();
    
    public async getThemes(): Promise<Array<ThemeViewModel>> {
        let nmvm = new Array<ThemeViewModel>();
        await this.themesContext.getAll().then((_ : Array<ThemeEntity>) => {
            _.forEach(row => {
                nmvm.push(new ThemeViewModel(row.themeId,  row.themeName, row.themeClassName));
            });
        });
        return nmvm;
    }
}