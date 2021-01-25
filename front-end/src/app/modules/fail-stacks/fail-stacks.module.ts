import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/sharedModule';
import { FailStacksPageComponent } from './fail-stacks-page/fail-stacks-page.component';

@NgModule({
  declarations: [
    
  FailStacksPageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class FailStacksModule { 
  static forRoot(): ModuleWithProviders<FailStacksModule> {
    return {
      ngModule: FailStacksModule
    }
  }
}
