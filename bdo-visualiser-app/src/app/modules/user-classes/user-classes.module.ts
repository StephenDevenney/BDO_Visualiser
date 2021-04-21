import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClassesPageComponent } from './user-classes/user-classes-page.component';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserClassesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class UserClassesModule { 
  static forRoot(): ModuleWithProviders<UserClassesModule> {
    return {
      ngModule: UserClassesModule
    }
  }
}
