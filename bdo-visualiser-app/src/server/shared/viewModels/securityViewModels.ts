
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