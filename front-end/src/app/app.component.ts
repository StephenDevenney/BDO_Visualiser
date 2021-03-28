import { Component } from '@angular/core';
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
  
  constructor(private apiService: APIService,
              private globals: Globals, 
              private authService: AuthService) {
    this.loadApplication();
  }

  public async loadApplication() {
    await this.apiService.loadConfigSettings();
    this.isLoaded = true;
    if(this.authService.isauthenticated())
      this.globals.isSignedIn = true;

      console.log(this.authService.getToken());
  }
}


