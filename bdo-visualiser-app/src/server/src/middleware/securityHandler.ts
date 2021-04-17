import { NavMenuContext } from '../sqlContext/securityContext';
import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';
import { NavMenuEntity } from 'src/server/shared/entities/securityEntities';

export class NavMenuHandler {
    public navMenu: NavMenuContext = new NavMenuContext();

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        let nmvm = new Array<NavMenuViewModel>();
        await this.navMenu.getAll().then((_ : Array<NavMenuEntity>) => { 
            _.forEach(row => {
                nmvm.push(new NavMenuViewModel(row.navName, row.navRoute, row.navTitle));
            });
        });
        return nmvm;
    }
}





// import { Injectable } from '@angular/core';
// import { SecurityContext } from '../sqlContext/securityContext';
// import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';

// @Injectable()
// export class SecurityHandler {
//     public securityContext: SecurityContext = new SecurityContext();
//   constructor(){}


//     public async getNavMenu() : Promise<Array<NavMenuViewModel>> {
//         let res = new Array<NavMenuViewModel>();
//         let source = await this.securityContext.getNavMenu();
//         await Promise.all(source.map(async (_) => {
//             res.push(new NavMenuViewModel(_.navName, _.navTitle, _.navRoute));
//         }));
//         console.log(res);
//         return res;
//     }

//     public getThemes() {

//     }

//     // public async getNavMenu() : Promise<Array<NavMenuViewModel>> {
//     //     let res = new Array<NavMenuViewModel>();
//     //     await this.securityContext.getNavMenu().subscribe(async src => {
//     //         await Promise.all(src.map((_: NavMenuEntity) => {
//     //             res.push(new NavMenuViewModel(_.navName, _.navTitle, _.navRoute));
//     //         }));
//     //         console.log(res);
//     //     });
//     //     return res;
//     // }
  
// } 
