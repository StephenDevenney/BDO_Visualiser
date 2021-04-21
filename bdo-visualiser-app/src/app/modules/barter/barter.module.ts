import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarterPageComponent } from './barter/barter-page.component';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BarterPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class BarterModule { 
  static forRoot(): ModuleWithProviders<BarterModule> {
    return {
      ngModule: BarterModule
    }
  }
}
