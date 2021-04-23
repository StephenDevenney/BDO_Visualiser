import { ChangeDetectorRef, Component, HostListener, Injector, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { Table } from 'primeng/table';
import { CombatPageDataViewModel, CombatHeadersViewModel, UserClassViewModel, VisibleDataViewModel } from 'src/server/shared/viewModels/combatViewModels';

@Component({
  selector: 'combat-page',
  templateUrl: './combat-page.component.html'
})
export class CombatPageComponent extends BaseComponent implements OnInit {
  @ViewChild('dt') public dt!: Table;
  public rowGroupMetadata: any;
  public isLoaded: boolean = false;
  public maxSelectedLabelsNum: number = 0;
  public combatPageData: CombatPageDataViewModel = new CombatPageDataViewModel();
  public grindingRes: Array<VisibleDataViewModel> = new Array<VisibleDataViewModel>();
  public isAddingEntry: boolean = false;
  public displayableHeaders: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
  public filteredColumns: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();
  public activeClasses: Array<UserClassViewModel> = new Array<UserClassViewModel>();

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
      this.activeClasses = this.combatPageData.activeClasses as Array<UserClassViewModel>;
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

    /*
      TODO: else { createClass redirect };
    */
  }

  public onVisibleColumnChange(event: { itemValue: CombatHeadersViewModel; }) {
    if(event.itemValue.isActive)
      event.itemValue.isActive = false;
    else
      event.itemValue.isActive = true;

    this.combatService.saveSingleCombatHeader(event.itemValue).catch((err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to updateColumn.', life: 2600 });
    });
  }

  public applyFilterGlobal($event: any, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }

  public emittedInsertEntry(vdVM: VisibleDataViewModel) {
    this.grindingRes.push(vdVM);
    this.customSort();
    this.updateRowGroupMetaData(this.grindingRes);
    
    /*
      TODO: update isActive columns
    */
  }
}
