import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RoutesRecognized } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Globals } from '../classes/globals';
import { AuthService } from './auth.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class APIService {
    // private jwtHelper = new JwtHelperService();

    constructor(private http: HttpClient,
                private globals: Globals) {
                
    }

    handleError(error: any) : Promise<any> {
        if(error.status && error.status == 401) {
            localStorage.removeItem("auth_token");
            window.location.href = "/";
        }
        else {

        }

        return Promise.reject(error.mesage || error);
    }

    /**
     *  Make a post request
     * @param action The url of the action to make this request to
     * @param body The payload body to send to the action above
     * @param options Any extra options for this request
     */
    // post<T>(action: string, body: any, options?: Object): Observable<T> {
    //     return this.http.post(action,body, options).pipe(
    //         catchError(err => this.handleError(err))
    //     );      
    // }

    // get<T>(action: string, options?: Object) : Observable<T> {
    //     return this.http.get(action, options).pipe(
    //         catchError(err => this.handleError(err))
    //     );  
    // }

    // patch<T>(action: string, body: any, options?: Object) : Observable<T> {
    //     return this.http.patch(action, body, options).pipe(
    //         catchError(err => this.handleError(err))
    //     );  
    // }

    // patchReplaceM<T>(action: string, fieldName: string, value: Object, options?: Object) : Observable<T> {
    //     var body = [];
    //     body.push({
    //         op: "replace",
    //         path: "/" + fieldName,
    //         value: value
    //     });
        
    //     return this.patch(action, body, options);
    // }

    // patchRemove<T>(action: string, fieldName: string, options?: Object) : Observable<T> {
    //     var body = [];
    //     body.push({
    //         op: "remove",
    //         path: "/" + fieldName
    //     });
        
    //     return this.patch(action, body, options);
    // }

    // delete<T>(action: string, options?: Object) : Observable<T> {
    //     return this.http.delete(action, options).pipe(
    //         catchError(err => this.handleError(err))
    //     );  
    // }

    // put<T>(action: string, options: Object): Observable<any> {
    //     return this.http.put(action, options);
    // }

    // getPermissions(): Observable<any> {
    //     // return this.get("security/permission");
    // }

    // getVersion(): Observable<any> {
    //     return this.get("security/version");
    // }

    public async loadSecuritySettings(): Promise<any> {
        this.globals.isSignedIn = false;
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
    }

    public loadConfigSettings(): Promise<any> {
        var authToken = localStorage.getItem("auth_token");

        return this.http.get("/assets/appsettings.json")
            .pipe(map((res) => res))
            .pipe(switchMap(res => {
                var tempRes: any = res;
                this.globals.config.appApiUrl = tempRes.appApiUrl;
                this.globals.config.hubName = tempRes.hubName;
                this.globals.config.instrumentKey = tempRes.instrumentKey;
                this.globals.config.discordRedirectUrl = tempRes.discordRedirectUrl;

                return this.loadSecuritySettings();

        })).toPromise().catch(err => {
            if(err)
                this.globals.seriousErrorMessage = err;
        }).then((r) => {
            if(!authToken) {
                var tempRes: any = r;
                if(this.globals.seriousErrorMessage == "") {
                    // this.globals.encryptDecryptKey = tempRes.encryptDecryptKey;
                }
            }
        },
        error => {
            console.error(error);
        });
    }
}