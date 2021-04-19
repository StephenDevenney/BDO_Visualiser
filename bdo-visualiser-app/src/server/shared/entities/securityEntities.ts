export class NavMenuEntity {
    constructor(navMenuId: number, navName: string, navTitle: string, navRoute: string) {}
    public navMenuId: number = 0;
    public navName: string = "";
    public navTitle: string = "";
    public navRoute: string = "";
}

export class SecuritySettingsEntity {
    public userId: number = 0;
    public userName: string = "";
    public userRoleId: number = 0;
    public navMinimised: boolean = false;
    public appIdleSecs: number = 0;
    public themeId: number = 0;
    public themeName: string = "";
    public themeClassName: string = "";

    constructor(userId?: number, userName?: string, userRoleId?: number, navMinimised?: boolean, appIdleSecs?: number, themeId?: number, themeName?: string, themeClassName?: string) {
        if(userId) {
            this.userId = userId;
            this.userName = userName;
            this.userRoleId = userRoleId;
            this.navMinimised = navMinimised;
            this.appIdleSecs = appIdleSecs;
            this.themeId = themeId;
            this.themeName = themeName;
            this.themeClassName = themeClassName;
        }
    }
}

export class ThemeEntity {
    public themeId: number = 0;
    public themeName: string = "";
    public themeClassName: string = "";

    constructor(themeId?: number, themeName?: string, themeClassName?: string) {
        this.themeId = themeId;
        this.themeName = themeName;
        this.themeClassName = themeClassName;
    }
}