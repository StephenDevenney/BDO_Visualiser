import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from './shared/classes/globals';
import { APIService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Visualiser';
  public isLoaded = false;
  public discordAuthToken: string = "";
  
  constructor(private apiService: APIService,
              private globals: Globals, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private titleService: Title) {
    this.loadApplication();
  }

  public async loadApplication() {
    await this.apiService.loadConfigSettings();
    this.isLoaded = true;
    if(this.authService.isauthenticated())
      this.globals.isSignedIn = true;

      this.titleService.setTitle(this.globals.config.hubName);
      this.route.queryParams.subscribe(params => {
        if(typeof(params['code']) != "undefined")
          this.discordAuthToken = params['code'];
        else if(this.authService.getLastPage() != null && this.authService.getToken().length > 0){
          this.discordAuthToken = this.authService.getToken();
        }

        let lastPage = "";
        if(typeof(this.authService.getLastPage()) == "undefined" || this.authService.getLastPage() != null)
          lastPage = this.authService.getLastPage();

        if(this.discordAuthToken.length > 0) {
          this.authService.setToken(this.discordAuthToken);
          this.globals.isSignedIn = true;
          if(this.globals.currentUrl.length > 0) {
            let lastPage = this.authService.getLastPage();
            if(lastPage.length > 0) 
              this.router.navigate([lastPage]).then(res => { this.globals.currentUrl=lastPage; this.titleService.setTitle(this.globals.config.hubName + " - " + lastPage); });
            else
              this.router.navigate(["home"]).then(res => { this.globals.currentUrl="home"; this.authService.setLastPage("home"); this.titleService.setTitle(this.globals.config.hubName + " - home"); });
          }
          else {
            if(lastPage.length > 0 && lastPage != "landing-page")
              this.router.navigate([lastPage]).then(res => { this.globals.currentUrl=lastPage; this.titleService.setTitle(this.globals.config.hubName + " - " + lastPage); });
            else
              this.router.navigate(["home"]).then(res => { this.globals.currentUrl="home"; this.authService.setLastPage("home"); this.titleService.setTitle(this.globals.config.hubName + " - home"); });
          }
            
        }
        else {
          this.globals.isSignedIn = false;
          this.authService.emptyLocalStorage();
          this.router.navigate(["landing-page"]).then(res => {
            this.titleService.setTitle(this.globals.config.hubName);
            this.globals.currentUrl="landing-page";
          });;
        }
      });
  }
}


