import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base.component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html'
})
export class SignInComponent extends BaseComponent implements OnInit {
  public discordAuthToken: string = "";

  constructor(private injector: Injector,
              private route: ActivatedRoute,
              private authService: AuthService) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(typeof(params['code']) != "undefined")
        this.discordAuthToken = params['code'];
      if(this.discordAuthToken.length > 0) {
        this.authService.setToken(this.discordAuthToken);
        this.globals.isSignedIn = true;
        this.router.navigate(["home"]).then(res => { this.globals.currentUrl="home"; this.authService.setLastPage("home"); });
      }
      else {
        this.globals.isSignedIn = false;
        this.router.navigate(["landing-page"]).then(res => { this.authService.emptyLocalStorage(); });
      }
        
    });
  }

}
