import { AfterViewInit, Component, ContentChild, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { Table } from 'primeng/table';
import { CombatPageDataViewModel, CombatHeadersViewModel, VisibleDataViewModel } from '../../../../server/shared/viewModels/combatViewModels';
import { UserClassViewModel } from '../../../../server/shared/viewModels/userClassViewModel';
import { CombatNewEntryViewModel } from '../../../shared/classes/newEntryEmitted';
import { TabPanel } from 'primeng/tabview';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'combat-page',
  templateUrl: './combat-page.component.html'
})
export class CombatPageComponent extends BaseComponent implements OnInit {
  @ViewChild('table') public dt!: Table;
  @ViewChild('stats') public statsComponent!: StatsComponent;
  public rowGroupMetadata: any;
  public isLoaded: boolean = false;
  public maxSelectedLabelsNum: number = 0;
  public combatPageData: CombatPageDataViewModel = new CombatPageDataViewModel();
  public grindingRes: Array<VisibleDataViewModel> = new Array<VisibleDataViewModel>();
  public isAddingEntry: boolean = false;
  public displayableHeaders: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
  public filteredColumns: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
  public activeClasses: Array<UserClassViewModel> = new Array<UserClassViewModel>();
  private tabPanels: any[] = [{id: 1, header: "Graphs"},{ id: 2, header: "Loot" },{id: 3, header: "Buffs"},{ id: 4, header: "Stats" }];
  public activeTabIndex: number = 0;

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }

  public ngOnInit(): void {
    this.loader.start();
    this.combatService.getCombatPageData().then((res: CombatPageDataViewModel) => {
      this.combatPageData = res;
      this.filteredColumns = res.tableHeaders.filter(header => header.isActive == true);
      this.displayableHeaders = res.tableHeaders.filter(header => header.headingId != 1);
      this.activeClasses = this.combatPageData.activeClasses;
      this.grindingRes = this.combatPageData.visibleData;
      this.updateRowGroupMetaData(this.grindingRes);
      this.isLoaded = true;
      this.loader.stop();
    }).catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error Loading Data.', life: 2600 });
      this.loader.stop();
      // Log Error
    });
  }

  /*
    Code from primeNG for updating table visual data.
  */
  public async updateRowGroupMetaData(data: string | any[]) {
    this.rowGroupMetadata = {};
    if (data) {
      for (let i = 0; i < data.length; i++) {
          let rowData = data[i];
          let date = rowData.dateCreated;
          
          if (i == 0)
            this.rowGroupMetadata[date] = { index: 0, size: 1 };
          else {
            let previousRowData = data[i - 1];
            let previousRowGroup = previousRowData.dateCreated;
            if (date === previousRowGroup)
                this.rowGroupMetadata[date].size++;
            else
                this.rowGroupMetadata[date] = { index: i, size: 1 };
          }
      }
      if(this.isAddingEntry)
        this.isAddingEntry = false;
    }
  } 

  public onFilter(event: any) {
    this.updateRowGroupMetaData(event.filteredValue);
  }

  public onSort(event: any) {
    this.updateRowGroupMetaData(event.filteredValue);
  }

  public customSort() {
    this.grindingRes.sort(function (a, b) {
      let aGroup = a.grindingId;
      let bGroup = b.grindingId;
      if (aGroup > bGroup) return -1;
      if (aGroup < bGroup) return 1;
      return 0
    });
  }

  public addEntryChecks() {
    if(this.activeClasses.length > 0)
      this.isAddingEntry = true;
    else
      this.messageService.add({severity:'warn', summary:'Class Required.', detail:'Create a class before adding an entry.', life: 2600 });
  }

  public async onVisibleColumnChange(event: { itemValue: CombatHeadersViewModel, value: Array<CombatHeadersViewModel> }) {
    if(typeof(event.itemValue) == "undefined") {
      let fullHeaders = false;
      if(event.value.length > 0)
        fullHeaders = true;

      await this.combatService.saveCombatHeaders(fullHeaders).catch((err: any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to updateColumn.', life: 2600 });
      });
    }
    else {
      if(event.itemValue.isActive)
        event.itemValue.isActive = false;
      else
        event.itemValue.isActive = true;

      await this.combatService.saveSingleCombatHeader(event.itemValue).catch((err: any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to updateColumn.', life: 2600 });
      });
    }
  }

  public applyFilterGlobal($event: any, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  public emittedInsertEntry(cneVM: CombatNewEntryViewModel) {
    this.grindingRes.push(cneVM.vdVM);
    this.filteredColumns = cneVM.chVM.filter(header => header.isActive == true);
    this.customSort();
    this.updateRowGroupMetaData(this.grindingRes);
    if(typeof(this.statsComponent) != "undefined")
      this.statsComponent.reloadTabData();
  }

  public emittedInsertCancel(fcVM: Array<CombatHeadersViewModel>) {
    this.isAddingEntry = false; 
    this.filteredColumns = fcVM.filter(header => header.isActive == true);
  }

  public handleChange(e: {originalEvent: MouseEvent, index: number}) {
    this.activeTabIndex = e.index;
  }
}