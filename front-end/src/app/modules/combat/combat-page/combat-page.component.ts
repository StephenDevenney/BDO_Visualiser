import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { GrindingData, GrindingTableHeaders, GrindingTable } from "../classes/grindingTable";
import { UserClass } from '../classes/userClass';
import { ClassNames } from '../classes/classNames';

@Component({
  selector: 'combat-page',
  templateUrl: './combat-page.component.html'
})
export class CombatPageComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }

  // General
  public rowGroupMetadata: any;
  public stateOptions = [{label: 'Off', value: 0}, {label: 'On', value: 1}];
  public isLoaded: boolean = false;
  public entryPopupTitle: string = "New Entry";
  public classNames: Array<ClassNames> = new Array<ClassNames>();

  // Grinding Data
  public grindingTable: GrindingTable;
  public grindingRes: Array<GrindingData> = new Array<GrindingData>();

  // Combat Headers
  public filteredColumns: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public columnHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public showAddEntryPopup: boolean = false;
  public showAddEntry: boolean = true;
  public showCombatHeaderDefaults: boolean = false;

  // Main Class
  public showMainClassEntry: boolean = false;
  public mainClass: UserClass = new UserClass();

  ngOnInit(): void {
    // Load grinding data and organise into row data.
    this.combatService.getGrindingData().subscribe( res => {
      this.grindingTable = res as GrindingTable;
      this.columnHeaders = this.grindingTable.tableHeaders as Array<GrindingTableHeaders>;
      this.filteredColumns = this.columnHeaders.filter(header => header.isActive == true);
      console.log(this.columnHeaders);
      this.grindingRes = this.grindingTable.tableData;
      this.updateRowGroupMetaData(this.grindingRes);
      if(this.grindingRes.length == 0){
        this.entryPopupTitle = "Select Combat Headers";
        this.showAddEntry = false;
        this.showCombatHeaderDefaults = true;
      }  
      this.isLoaded = true;
    });

    this.combatService.getAllClassNames().subscribe(res => {
      this.classNames = res as Array<ClassNames>;
      console.log(this.classNames);
    });
  }

  // Displayed data.
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

  // Update backend for default combat headers
  public async saveDefaultColumns(): Promise<any> {
    await this.combatService.saveCombatHeaders(this.columnHeaders).then(async res => {

      // Load main class if exists, update check if not.
      await this.combatService.getMainClass().then(res => {
        if(res) {
          this.mainClass = res as UserClass;
        } 
        else 
          this.showMainClassEntry = true;
      },
      err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to retrieve main class', life: 2600 });
      }).then(res => {

        // Continue with function
        if(!this.showMainClassEntry){
          this.showCombatHeaderDefaults = false;
          this.showAddEntry = true; 
          this.entryPopupTitle = "Add Entry";
        }
        else {
          this.showCombatHeaderDefaults = false;
          this.entryPopupTitle = "Add Main Class";
        }
        this.messageService.add({severity:'success', summary:'Combat Headers Updated', detail:'You can change your combat headers later.', life: 2600 });
      });
    },
    err => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Combat headers failed to update.', life: 2600 });
    });
  }

  public saveMainClass() {
    if(this.mainClass.className.length > 0) {
      this.combatService.addMainClass(this.mainClass).subscribe(res => {
        console.log(res as UserClass);
        this.showMainClassEntry = false;
        this.showAddEntry = true;
        this.entryPopupTitle = "Add Entry";
        this.messageService.add({severity:'success', summary:'Class created', detail:'You can edit this class and add more classes later.', life: 2600 });
      });
    }
    else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Class Required.', life: 2600 });
    }
  }
}
