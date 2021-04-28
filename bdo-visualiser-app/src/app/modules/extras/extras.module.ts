import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';
import { ExtrasPageComponent } from './extras-page/extras-page.component';
import { ExtrasService } from './extras.service';



@NgModule({
  declarations: [
    ExtrasPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ExtrasService
  ]
})

export class ExtrasModule { 
  static forRoot(): ModuleWithProviders<ExtrasModule> {
    return {
      ngModule: ExtrasModule
    }
  }
}
