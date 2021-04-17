import { Injectable } from '@angular/core';
import { SecurityContext } from '../sqlContext/securityContext';
import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';

@Injectable()
export class SecurityHandler {
    public securityContext: SecurityContext = new SecurityContext();
  constructor(){}


    public async getNavMenu() : Promise<Array<NavMenuViewModel>> {
        let res = new Array<NavMenuViewModel>();
        console.log(res);
        let source = await this.securityContext.getNavMenu();
        await Promise.all(source.map(async (_) => {
            res.push(new NavMenuViewModel(_.navName, _.navTitle, _.navRoute));
        }));
        console.log("handled");
        return res;
    }

    public getThemes() {

    }
  
} 