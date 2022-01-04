import { AfterViewInit, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CombatHeadersViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, VisibleDataViewModel } from '../../../../server/shared/viewModels/combatViewModels';
import { CombatTypesEnumViewModel, UserClassViewModel } from '../../../../server/shared/viewModels/userClassViewModel';
import { CombatNewEntryViewModel } from '../../classes/newEntryEmitted';
import { APIService } from '../../services/api.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'table-insert',
  templateUrl: './table-insert.component.html'
})
export class TableInsertComponent extends BaseComponent implements AfterViewInit, OnInit {
  @Output() updateCombatRes: EventEmitter<CombatNewEntryViewModel> = new EventEmitter();
  @Output() cancelInsert: EventEmitter<Array<CombatHeadersViewModel>> = new EventEmitter();
  @Input() combatHeaders: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
  @Input() tableLength: number = 0;
  public combatEnums: CombatPageEnumsViewModel = new CombatPageEnumsViewModel();
  public newEntry: GrindingDataViewModel = new GrindingDataViewModel();
  public isLoaded: boolean = false;
  public agrisIsReady: boolean = false;

  constructor(private injector: Injector, 
              private apiService: APIService,) {
    super(injector);
  }

  ngOnInit() {
    if(this.globals.config.previousPage.navMenuId == 2) {
      this.apiService.getCombatNewEntryData().then((res: CombatPageEnumsViewModel) => {
        this.combatEnums = res;
        console.log(res);
      }).finally(async () => {
        if(this.tableLength == 0) {
          this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0].items[0];
          this.newEntry.timeAmount = this.combatEnums.timeAmountEnum[0];
          this.newEntry.server = this.combatEnums.serverNamesEnum[0];
          this.newEntry.combatType = this.combatEnums.combatTypesEnum[0];
          this.newEntry.agris = this.combatEnums.agrisEnum[0];
          this.newEntry.userClass = this.combatEnums.activeClasses[0]; 
        }
        else {
          this.newEntry.timeAmount = this.combatEnums.timeAmountEnum.filter((_) => _.timeId == this.combatEnums.previousCombatValuesViewModel.timeAmount.timeId)[0];
          this.newEntry.userClass = this.combatEnums.activeClasses.filter((_) => _.classId == this.combatEnums.previousCombatValuesViewModel.userClass.classId)[0];
          this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0].items[0];
          if(this.combatEnums.previousCombatValuesViewModel.server.serverId > 1)
            this.newEntry.server = this.combatEnums.serverNamesEnum.filter((_) => _.serverId == this.combatEnums.previousCombatValuesViewModel.server.serverId)[0];
            
          if(this.combatEnums.previousCombatValuesViewModel.combatType.combatTypeId > 1)
            this.newEntry.combatType = this.combatEnums.previousCombatValuesViewModel.combatType;
          if(this.combatEnums.previousCombatValuesViewModel.agris.agrisId > 1)
            this.newEntry.agris = this.combatEnums.previousCombatValuesViewModel.agris;
        }
        
        this.isLoaded = true;
      }).catch((err: any) => {
        console.log(err);
        this.messageService.add({severity:'error', summary:'Error', detail:'Error Loading Enums.', life: 2600 });
      });
    }
  }

  ngAfterViewInit() {
    
  }

  public toggleSwitch(header: CombatHeadersViewModel) {
    this.apiService.saveSingleCombatHeader(header).catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to updateColumn.', life: 2600 });
    });   
  }

  public async createEntry() {
    this.loader.startBackground();
    await this.apiService.addGrindingEntry(this.newEntry, this.combatHeaders).then((res: VisibleDataViewModel) => {
      this.updateCombatRes.emit(new CombatNewEntryViewModel(res, this.combatHeaders));
      this.loader.stopBackground();
    }).catch((err: any) => {
      console.log(err);
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add entry.', life: 2600 });
      this.loader.stopBackground();
    });
  }

  public currentClassChanged(e: { originalEvent: MouseEvent, value: UserClassViewModel }) {
    if(this.newEntry.combatType.combatTypeId != 5)
      this.newEntry.combatType = e.value.combatTypeEnum;
    else if (this.combatEnums.previousCombatValuesViewModel.combatType.combatTypeId != 5 && this.combatEnums.previousCombatValuesViewModel.combatType.combatTypeId != 1)
      this.newEntry.combatType = this.combatEnums.previousCombatValuesViewModel.combatType;
  }

  public combatTypeChanged(e: { originalEvent: MouseEvent, value: CombatTypesEnumViewModel }) {
    this.newEntry.combatType = e.value;
  }
}
