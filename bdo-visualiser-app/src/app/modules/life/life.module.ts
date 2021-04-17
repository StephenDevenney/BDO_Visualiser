import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifePageComponent } from './life-page/life-page.component';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LifePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class LifeModule { 
  static forRoot(): ModuleWithProviders<LifeModule> {
    return {
      ngModule: LifeModule
    }
  }
}
