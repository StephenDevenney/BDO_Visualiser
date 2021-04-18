import { Component, Injector, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavMenuViewModel } from 'src/server/shared/viewModels/securityViewModels';
import { BaseComponent } from '../../shared/components/base.component';
import { AuthService } from '../../shared/services/auth.service';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent extends BaseComponent implements OnInit {
  public navToggle: boolean = false;
  public navigationMenu: Array<NavMenuViewModel> = new Array<NavMenuViewModel>();
  public navLoaded: boolean = false;
  
  constructor(private injector: Injector, 
              private sideNavService: SidenavService,
              private authService: AuthService,
              private titleService: Title) { 
                
    super(injector);
  }

  ngOnInit(): void {
    this.sideNavService.getNavMenu().catch((err: any) => {
      // Log Error
    }).then(res => {
      this.navigationMenu = res as Array<NavMenuViewModel>;
      this.navLoaded = true;
    });
  }

  public async navToPage(navRoute: string) {
    if(navRoute != "" || navRoute != undefined)
      await this.router.navigate([navRoute]).then(res => {
        this.titleService.setTitle(this.globals.config.hubName + " - " + navRoute);
        this.globals.currentUrl=navRoute;
        // this.authService.setLastPage(navRoute);
      });
  }

}
