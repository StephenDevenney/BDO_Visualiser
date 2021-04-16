import { Injectable } from '@angular/core';
import { Globals } from '../../shared/classes/globals';
import { APIService } from '../../shared/services/api.service';

@Injectable()
export class SidenavService {
  constructor(private http: APIService,
              private globals: Globals){}


    // public getNavMenu() {
    //   return this.http.get(this.globals.config.appApiUrl + "security/nav-menu");
    // }
  
} 
