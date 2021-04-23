import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { CombatHeadersViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, UserClassViewModel, VisibleDataViewModel } from 'src/server/shared/viewModels/combatViewModels';
import { APIService } from '../../services/api.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'table-insert',
  templateUrl: './table-insert.component.html'
})
export class TableInsertComponent extends BaseComponent implements OnInit {
  @Output() updateCombatRes: EventEmitter<VisibleDataViewModel> = new EventEmitter();
  @Output() cancelInsert: EventEmitter<void> = new EventEmitter();
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
    if(this.globals.config.previousPage.navMenuId == 2) {
      this.apiService.getCombatEnums().then((res: CombatPageEnumsViewModel) => {
        this.combatEnums = res;
      }).finally(async () => {
        if(this.tableLength == 0) {
          this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0].items[0];
          this.newEntry.timeAmount = this.combatEnums.timeAmountEnum[0];
          this.newEntry.server = this.combatEnums.serverNamesEnum[0];
          this.newEntry.combatType = this.combatEnums.combatTypesEnum[0];
          this.newEntry.userClass = this.activeClasses.filter(_ => _.classRole == "Main")[0];
        }
        else {
          /*
            Despite working for timeAmount, UI doesn't update selected ViewModel for server but value does bind as expected when creating entry.
            // this.newEntry.server = this.combatEnums.previousCombatValuesViewModel.server;
          */
          this.newEntry.timeAmount = this.combatEnums.previousCombatValuesViewModel.timeAmount;
          this.newEntry.combatType = this.combatEnums.previousCombatValuesViewModel.combatType;
          this.newEntry.userClass = this.combatEnums.previousCombatValuesViewModel.userClass;
          this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0].items[0];
        }
        
        this.isLoaded = true;
      }).catch((err: any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error Loading Enums.', life: 2600 });
      });
    }
    
  }

  public toggleSwitch(header: CombatHeadersViewModel) {
    this.apiService.saveSingleCombatHeader(header).catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to updateColumn.', life: 2600 });
    });
  }

  public async createEntry() {
    this.loader.startBackground();
    await this.apiService.addGrindingEntry(this.newEntry, this.combatHeaders).then((res: VisibleDataViewModel) => {
      this.updateCombatRes.emit(res);
      this.loader.stopBackground();
    }).catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add entry.', life: 2600 });
      this.loader.stopBackground();
    });
  }
}
