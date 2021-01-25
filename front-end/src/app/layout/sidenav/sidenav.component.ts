import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base.component';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent extends BaseComponent implements OnInit {
  public navToggle: boolean = false;
  public navigationMenu: any;
  public navLoaded: boolean = false;
  
  constructor(private injector: Injector, 
              private sideNavService: SidenavService) { 
                
    super(injector);
  }

  ngOnInit(): void {
    this.sideNavService.getNavMenu().subscribe( res => {
      this.navigationMenu = res;
      this.navLoaded = true;
    });
  }

  public navToPage(navRoute: string) {
    console.log(navRoute);
    if(navRoute != "" || navRoute != undefined)
      this.router.navigate([navRoute]);
  }

}
