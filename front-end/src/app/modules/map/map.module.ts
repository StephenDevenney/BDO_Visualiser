import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './map-page/map-page.component';
import { SharedModule } from '../../shared/modules/sharedModule';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MapPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class MapModule { 
  static forRoot(): ModuleWithProviders<MapModule> {
    return {
      ngModule: MapModule
    }
  }
}
