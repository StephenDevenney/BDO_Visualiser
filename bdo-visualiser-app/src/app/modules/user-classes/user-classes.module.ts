import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClassesPageComponent } from './user-classes/user-classes-page.component';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';
import { ClassCreationPageComponent } from './class-creation/class-creation-page.component';
import { UserClassesService } from './user-classes.service';
import { ClassEditPageComponent } from './class-edit/class-edit.component';

@NgModule({
  declarations: [
    UserClassesPageComponent,
    ClassCreationPageComponent,
    ClassEditPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserClassesService
  ]
})

export class UserClassesModule { 
  static forRoot(): ModuleWithProviders<UserClassesModule> {
    return {
      ngModule: UserClassesModule
    }
  }
}
