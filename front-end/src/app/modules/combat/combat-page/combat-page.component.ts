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
  public columnsHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public isLoaded: boolean = false;

  ngOnInit(): void {

    this.combatService.getGrindingData().subscribe( res => {
      this.grindingTable = res as GrindingTable;
      this.columnsHeaders = this.grindingTable.tableHeaders;
      this.grindingRes = this.grindingTable.tableData;
      this.updateRowGroupMetaData(this.grindingRes);
    });

    this.combatService.getDefaultColumns().subscribe( res => {
      this.filteredColumns = res as Array<GrindingTableHeaders>;  
      this.updateRowGroupMetaData(this.grindingRes);
      this.isLoaded = true;
    });

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
    console.log("filtered");
    this.updateRowGroupMetaData(event.filteredValue);
 }

  public onRowSelect(e) {

  }
}
