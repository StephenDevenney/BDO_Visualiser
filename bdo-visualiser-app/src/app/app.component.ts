import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from './shared/classes/globals';
import { APIService } from './shared/services/api.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'BDO Visualiser';
  public isLoaded = false;
  public discordAuthToken: string = "";

  constructor(private apiService: APIService,
              public globals: Globals, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.loadApplication();
  }

  public async loadApplication() {
    await this.apiService.loadConfigSettings();
    this.isLoaded = true;
    this.router.navigate(["combat"]);
  }
}
