import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputSwitch } from 'primeng/inputswitch';
import { CombatHeadersViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, UserClassViewModel } from 'src/server/shared/viewModels/combatViewModels';
import { APIService } from '../../services/api.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'table-insert',
  templateUrl: './table-insert.component.html'
})
export class TableInsertComponent extends BaseComponent implements OnInit {
  @Input() combatHeaders: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
  @Input() activeClasses: Array<UserClassViewModel> = new Array<UserClassViewModel>();
  @Input() tableLength: number = 0;
  public combatEnums: CombatPageEnumsViewModel = new CombatPageEnumsViewModel();
  public newEntry: GrindingDataViewModel = new GrindingDataViewModel();
  public isLoaded: boolean = false;

  constructor(private injector: Injector, 
              private apiService: APIService,) {
    super(injector);
  }

  ngOnInit(): void {
    if(this.globals.currentPageId == 2) {
      this.apiService.getCombatEnums().catch((err: any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error Loading Enums.', life: 2600 });
      }).then((res: CombatPageEnumsViewModel) => {
        this.combatEnums = res;
        this.isLoaded = true;
      }).finally(() => {
          // Default newEntry
          this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0].items[0];
          this.newEntry.timeAmount = this.combatEnums.timeAmountEnum[0];
          this.newEntry.userClass = this.activeClasses.filter(_ => _.classRole == "Main")[0];
          this.newEntry.server = this.combatEnums.serverNamesEnum[0];
          this.newEntry.combatType = this.combatEnums.combatTypesEnum[0];
      });
    }
  }

  public toggleSwitch(e: InputSwitch) {
    // if(e.checked)
    //   this.globals.config.theme = this.themes[0];
    // else
    //   this.globals.config.theme = this.themes[1];
    console.log(e);
  }

}
