
import { NavMenuHandler } from '../middleware/securityHandler';
import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';

export class SecurityController {
    public navMenu: NavMenuHandler = new NavMenuHandler();
    constructor(){}

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        return await this.navMenu.getNavMenu();
    } 
} 


  // import { Injectable } from '@angular/core';
// import { SecurityHandler } from '../middleware/securityHandler';
// import { NavMenuViewModel } from '../../shared/viewModels/securityViewModels';

// @Injectable()
// export class SecurityController {
//     private securityHandler: SecurityHandler = new SecurityHandler();
//     constructor(){}

//     public async getNavMenu() : Promise<Array<NavMenuViewModel>> {
//         return await this.securityHandler.getNavMenu();
//     }
  
// } 