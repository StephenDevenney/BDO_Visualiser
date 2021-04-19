import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    public hubName: string = "";
    public theme: Theme = new Theme;
    public navMinimised: boolean = false;
    public appIdleSecs: number = 0;
}

export class Theme {
    public themeId: number = 0;
    public themeName: string = "";
    public themeClassName: string = "";
}


