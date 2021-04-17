import { Injectable } from '@angular/core';
import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';
import { SecurityController } from 'src/server/src/routes/securityController';

@Injectable()
export class SidenavService {
  constructor(private secRoute: SecurityController){}

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
      console.log("sent");
      return await this.secRoute.getNavMenu();
    }
  
} 
