export class NavMenuEntity {
    public navMenuId: number = 0;
    public navName: string = "";
    public navTitle: string = "";
    public navRoute: string = "";

    constructor(navMenuId?: number, navName?: string, navTitle?: string, navRoute?: string) {
        if(navMenuId) {
            this.navMenuId = navMenuId;
            this.navName = navName;
            this.navTitle = navTitle;
            this.navRoute = navRoute;
        }
    }
}

export class SecuritySettingsEntity {
    public userId: number = 0;
    public userName: string = "";
    public userRoleId: number = 0;
    public navMinimised: boolean = false;
    public idleTime: number = 0;
    public themeId: number = 0;
    public themeName: string = "";
    public themeClassName: string = "";
    public previousPageId: number = 0;

    constructor(userId?: number, userName?: string, userRoleId?: number, navMinimised?: boolean, idleTime?: number, themeId?: number, themeName?: string, themeClassName?: string, previousPageId?: number) {
        if(userId) {
            this.userId = userId;
            this.userName = userName;
            this.userRoleId = userRoleId;
            this.navMinimised = navMinimised;
            this.idleTime = idleTime;
            this.themeId = themeId;
            this.themeName = themeName;
            this.themeClassName = themeClassName;
            this.previousPageId = previousPageId;
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