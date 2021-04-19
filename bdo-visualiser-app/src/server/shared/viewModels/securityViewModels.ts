
export class NavMenuViewModel {
    public navName: string = "";
    public navTitle: string = "";
    public navRoute: string = "";

    constructor(navName: string, navTitle: string, navRoute: string) {
        this.navName = navName;
        this.navTitle = navTitle;
        this.navRoute = navRoute;
    }
}

export class SecuritySettingsViewModel {
    public user: AppUserViewModel = new AppUserViewModel;
    public isSignedIn: boolean = false;
    public seriousErrorMessage: string = "";
    public previousUrl: string = "";
    public currentUrl: string = "";
    public config: ConfigViewModel = new ConfigViewModel;

    constructor(user?: AppUserViewModel, isSignedIn?: boolean, config?: ConfigViewModel) {
        if(user) {
            this.user = user;
            this.isSignedIn = isSignedIn;
            this.config = config;
        }
    }
}

export class ConfigViewModel {
    public hubName: string = "BDO Visualiser";
    public theme: ThemeViewModel = new ThemeViewModel;
    public navMinimised: boolean = false;
    public appIdleSecs: number = 0;

    constructor(theme?: ThemeViewModel, navMinimised?: boolean, appIdleSecs?: number) {
        if(theme) {
            this.theme = theme;
            this.navMinimised = navMinimised;
            this.appIdleSecs = appIdleSecs;
        }
    }
}

export class AppUserViewModel {
    public userId: number = 0;
    public userName: string = "";
    public userRoleId: number = 0;

    constructor(userId?: number, userName?: string, userRoleId?: number) {
        if(userId) {
            this.userId = userId;
            this.userName = userName
            this.userRoleId = userRoleId;
        }
    }
}

export class ThemeViewModel {
    public themeId: number = 0;
    public themeName: string = "";
    public themeClassName: string = "";

    constructor(themeId?: number, themeName?: string, themeClassName?: string) {
        this.themeId = themeId;
        this.themeName = themeName;
        this.themeClassName = themeClassName;
    }
}