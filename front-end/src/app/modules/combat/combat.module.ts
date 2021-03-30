import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombatPageComponent } from './combat-page/combat-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/sharedModule';
import { CombatService } from './combat.service';
import { TabViewModule } from 'primeng/tabview';
import { TotalsComponent } from './combat-page/totals/totals.component';
import { BuffsComponent } from './combat-page/buffs/buffs.component';
import { LootComponent } from './combat-page/loot/loot.component';
import { GraphsComponent } from './combat-page/graphs/graphs.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [
    CombatPageComponent,
    TotalsComponent,
    BuffsComponent,
    LootComponent,
    GraphsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabViewModule,
    InputSwitchModule,
    FileUploadModule,
    NgxCsvParserModule
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
