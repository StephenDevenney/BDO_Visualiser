import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { GrindingData, GrindingTableHeaders, GrindingTable } from "../classes/grindingTable";

@Component({
  selector: 'combat-page',
  templateUrl: './combat-page.component.html'
})
export class CombatPageComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }

  public grindingTable: GrindingTable;
  public grindingRes: Array<GrindingData> = new Array<GrindingData>();
  public rowGroupMetadata: any;
  public filteredColumns: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public columnHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public stateOptions = [{label: 'Off', value: 0}, {label: 'On', value: 1}];
  public isLoaded: boolean = false;
  public showAddEntryPopup: boolean = false;
  public entryPopupTitle: string = "New Entry";
  public showAddEntry: boolean = true;

  ngOnInit(): void {

    this.combatService.getGrindingData().subscribe( res => {
      this.grindingTable = res as GrindingTable;
      this.columnHeaders = this.grindingTable.tableHeaders as Array<GrindingTableHeaders>;
      console.log(this.columnHeaders);
      this.filteredColumns = this.columnHeaders.filter(header => header.isActive == true);
      console.log(this.columnHeaders);
      this.grindingRes = this.grindingTable.tableData;
      this.updateRowGroupMetaData(this.grindingRes);
      if(this.grindingRes.length == 0){
        this.entryPopupTitle = "Select Combat Headers";
        this.showAddEntry = false;
      }  
      this.isLoaded = true;
    });

    // this.combatService.getDefaultColumns().subscribe( res => {
    //   this.filteredColumns = res as Array<GrindingTableHeaders>;
    //   console.log(this.filteredColumns);
    //   this.updateRowGroupMetaData(this.grindingRes);
    //   this.isLoaded = true;
    // });

  }

  public updateRowGroupMetaData(data) {
    this.rowGroupMetadata = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let rowData = data[i];
            let date = rowData.date;
            
            if (i == 0) {
                this.rowGroupMetadata[date] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = data[i - 1];
                let previousRowGroup = previousRowData.date;
                if (date === previousRowGroup)
                    this.rowGroupMetadata[date].size++;
                else
                    this.rowGroupMetadata[date] = { index: i, size: 1 };
            }
        }
    }
  } 

  onFilter(event) {
    this.updateRowGroupMetaData(event.filteredValue);
 }

  public onRowSelect(e) {

  }

  public saveDefaultColumns() {
    this.combatService.saveCombatHeaders(this.columnHeaders).subscribe( res => {
      this.showAddEntry = true; 
      this.entryPopupTitle = "Add Entry";
      this.messageService.add({severity:'success', summary:'Combat Headers Updated', detail:'You can change your combat headers later.', life: 2600 });
    },
    err => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Combat headers failed to update.', life: 2600 });
    });
  }
}
