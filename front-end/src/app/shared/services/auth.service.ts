import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RoutesRecognized } from '@angular/router';
import { Globals } from '../classes/globals';
import { APIService } from './api.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService implements CanActivate {
    // private jwtHelper = new JwtHelperService();

    constructor(private router: Router,
                private http: APIService,
                private globals: Globals){

    }

    public canActivate(route: ActivatedRouteSnapshot) {
        let page = route.data.page as string;
        if(page) 
            localStorage.setItem("current_page", page);

        var isPageAllowed = true;
        var pageRole = this.globals.pageUserRoleAccess.find(p => p.path == route.routeConfig.path);
        if(pageRole)
            if(pageRole.userRoles.indexOf(parseInt(this.globals.user.roleId)) < 0) isPageAllowed = false;

        return this.isauthenticated() && isPageAllowed;
    }

    public isauthenticated(): boolean {
        var id_token = this.getToken();
        if(!id_token)
            this.router.navigate(["landing-page"]);

        return true
    }

    public getToken() : string {
        return localStorage.getItem("auth_token");
    }

    public setToken(token: string) : void {
        return localStorage.setItem("auth_token", token);
    }

    public emptyLocalStorage() : void {
        localStorage.removeItem("auth_token");
    }
}