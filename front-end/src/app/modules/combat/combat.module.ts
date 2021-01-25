import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatPageComponent } from './combat-page/combat-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/sharedModule';
import { CombatService } from './combat.service';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    CombatPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabViewModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CombatService
  ]
})

export class CombatModule { 
  static forRoot(): ModuleWithProviders<CombatModule> {
    return {
      ngModule: CombatModule
    }
  }
}
