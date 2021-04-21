import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollsPageComponent } from './scrolls/scrolls-page.component';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ScrollsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class ScrollsModule { 
  static forRoot(): ModuleWithProviders<ScrollsModule> {
    return {
      ngModule: ScrollsModule
    }
  }
}
