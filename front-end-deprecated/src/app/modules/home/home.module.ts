import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/sharedModule';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class HomeModule { 
  static forRoot(): ModuleWithProviders<HomeModule> {
    return {
      ngModule: HomeModule
    }
  }
}
