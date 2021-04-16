import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/signin.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/sharedModule';
import { LandingPageComponent } from './landing-page/landingPage.component';

@NgModule({
  declarations: [
    SignInComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class SignInModule { 
  static forRoot(): ModuleWithProviders<SignInModule> {
    return {
      ngModule: SignInModule
    }
  }
}
