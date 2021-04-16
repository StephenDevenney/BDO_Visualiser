import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base.component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landingPage.component.html'
})
export class LandingPageComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector,
              private route: ActivatedRoute,
              private authService: AuthService) {
    super(injector);
  }

  ngOnInit(): void {

  }

  public discordRedirect() {
    window.location.href = this.globals.config.discordRedirectUrl;
  }

}
