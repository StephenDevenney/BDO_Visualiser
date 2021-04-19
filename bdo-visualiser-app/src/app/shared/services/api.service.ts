import { Injectable, Injector } from '@angular/core';
import { SecuritySettingsViewModel } from '../../../server/shared/viewModels/securityViewModels';
import { SecurityController } from '../../../server/src/routes/securityController';
import { Globals } from '../classes/globals';

@Injectable()
export class APIService {
    constructor(private globals: Globals,
                private secRoute: SecurityController) {
                
    }

    public async loadSecuritySettings(): Promise<any> {
        await this.secRoute.getSecuritySettings().catch((err: any) => {
            this.globals.seriousErrorMessage = err;
        }).then((res: SecuritySettingsViewModel) => {
            this.globals.isSignedIn = res.isSignedIn;
            this.globals.config = res.config;
            this.globals.user = res.user;
            console.log(this.globals);
        });
      }

    // public async loadSecuritySettings(): Promise<any> {
    //     this.globals.isSignedIn = false;
    //     this
        // return this.http.get(this.globals.config.appApiUrl + "security/config-settings").pipe(map(r => r)).toPromise().catch(err => {
        //     if(err)
        //         this.globals.seriousErrorMessage = err;          
        // }).then((r) => {
        //     var tempRes: any = r;
        //     this.globals.user.userId = tempRes.user.userId;
        //     this.globals.user.userName = tempRes.user.userName;
        //     this.globals.user.roleId = tempRes.user.FK_roleId;
        //     this.globals.config.theme.themeId = tempRes.settings.themeId;
        //     this.globals.config.theme.themeName = tempRes.settings.themeName;
        //     this.globals.config.theme.className = tempRes.settings.className;
        //     this.globals.config.navMinimised = tempRes.settings.navMinimised as boolean;
        //     this.globals.config.appIdleSecs = tempRes.settings.appIdleSecs;
        //     console.log(this.globals);
        // },
        // error => {
        //     console.error(error);
        // });
    // }

    // public loadConfigSettings(): Promise<any> {
    //     var authToken = localStorage.getItem("auth_token");

    //     return this.http.get("/assets/appsettings.json")
    //         .pipe(map((res) => res))
    //         .pipe(switchMap(res => {
    //             var tempRes: any = res;
    //             this.globals.config.appApiUrl = tempRes.appApiUrl;
    //             this.globals.config.hubName = tempRes.hubName;
    //             this.globals.config.instrumentKey = tempRes.instrumentKey;
    //             this.globals.config.discordRedirectUrl = tempRes.discordRedirectUrl;

    //             return this.loadSecuritySettings();

    //     })).toPromise().catch(err => {
    //         if(err)
    //             this.globals.seriousErrorMessage = err;
    //     }).then((r) => {
    //         if(!authToken) {
    //             var tempRes: any = r;
    //             if(this.globals.seriousErrorMessage == "") {
    //                 // this.globals.encryptDecryptKey = tempRes.encryptDecryptKey;
    //             }
    //         }
    //     },
    //     error => {
    //         console.error(error);
    //     });
    // }
}