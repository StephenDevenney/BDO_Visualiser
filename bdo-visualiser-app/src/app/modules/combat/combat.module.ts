import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatPageComponent } from './combat-page/combat-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/sharedModule';
import { CombatService } from './combat.service';
import { StatsComponent } from './combat-page/stats/stats.component';
import { BuffsComponent } from './combat-page/buffs/buffs.component';
import { LootComponent } from './combat-page/loot/loot.component';
import { GraphsComponent } from './combat-page/graphs/graphs.component';
import { ServerModule } from '../../../server/src/serverModule';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ServerModule,
    CarouselModule
  ],
  declarations: [
    CombatPageComponent,
    StatsComponent,
    BuffsComponent,
    LootComponent,
    GraphsComponent
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
