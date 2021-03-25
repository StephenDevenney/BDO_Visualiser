import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { GrindingData, GrindingTableHeaders, CombatPageData } from "../classes/grindingTable";
import { UserClass } from '../classes/userClass';
import { ClassNamesEnum, CombatPageEnums } from '../classes/combatEnums';

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
  public classNames: Array<ClassNamesEnum> = new Array<ClassNamesEnum>();
  public combatEnums: CombatPageEnums = new CombatPageEnums();

  // Grinding Data
  public combatPageData: CombatPageData;
  public grindingRes: Array<GrindingData> = new Array<GrindingData>();

  // New Entry
  public newGrindingResEntry: Array<GrindingData> = new Array<GrindingData>();
  public newColumnHeadersFiltered: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public newEntry: GrindingData = new GrindingData();

  // Combat Headers
  public filteredColumns: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public columnHeaders: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
  public showAddEntryPopup: boolean = false;

  // User Classes
  public mainClass: UserClass = new UserClass();
  public activeClasses: Array<UserClass> = new Array<UserClass>();

  // Popup Checks
  public entryPopupTitle: string = "Add New Entry";
  public showCombatDefaultColumns: boolean = false;
  public showAddMainClass: boolean = false;
  public showGrindingTableEntry: boolean = false;

  ngOnInit(): void {
    // Load grinding data and organise into row data.
    this.loader.start();
    this.combatService.getCombatPageData().subscribe( res => {
      this.combatPageData = res as CombatPageData;
      console.log(this.combatPageData);
      this.columnHeaders = this.combatPageData.tableHeaders as Array<GrindingTableHeaders>;
      this.filteredColumns = this.columnHeaders.filter(header => header.isActive == true);
      this.newColumnHeadersFiltered = this.columnHeaders.filter(header => header.headingId != 1);
      this.activeClasses = this.combatPageData.activeClasses as Array<UserClass>;
      if(this.combatPageData.hasMainClass)
        this.mainClass = this.activeClasses.filter(uc => uc.classRole == "Main")[0];

      this.grindingRes = this.combatPageData.tableData;
      this.updateRowGroupMetaData(this.grindingRes);
      this.isLoaded = true;
      this.loader.stop();
      console.log(this.newEntry);
    },
    err => {
      this.loader.stop();
    });

    this.combatService.getCombatEnums().subscribe(res => {
      this.combatEnums = res as CombatPageEnums;
      console.log(this.combatEnums);
    });
  }

  // Displayed data.
  public updateRowGroupMetaData(data) {
    this.rowGroupMetadata = {};
    if (data) {
        for (let i = 0; i < data.length; i++) {
            let rowData = data[i];
            let date = rowData.dateCreated;
            
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

  public async saveDefaultColumns() {
    this.loader.startBackground();
    await this.combatService.saveCombatHeaders(this.columnHeaders).then(res => {
        this.combatPageData.hasDefaultCombatHeaders = true;
        this.filteredColumns = res as Array<GrindingTableHeaders>;
    },
    err => {
      this.loader.stopBackground();
      this.messageService.add({severity:'error', summary:'Error', detail:'Combat headers failed to update.', life: 2600 });
    }).then(_ => {
      this.addEntryPopupChecks();
      this.loader.stopBackground();
    });
  }

  public saveMainClass() {
    if(this.mainClass.className.length > 0) {
      this.loader.startBackground();
      this.combatService.addMainClass(this.mainClass).subscribe(res => {
        this.mainClass = res as UserClass;
        console.log(this.mainClass);
        this.combatPageData.hasMainClass = true;
        this.combatPageData.activeClasses.push(this.mainClass);
        this.addEntryPopupChecks();
        this.loader.stopBackground();
      },
      err => {
        this.loader.stopBackground();
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to save class', life: 2600 });
      });
    }
    else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Class Required.', life: 2600 });
    }
  }

  public async addEntryPopupChecks() {
    if(this.grindingRes.length == 0 && !this.combatPageData.hasDefaultCombatHeaders) {
      this.entryPopupTitle = "Select Combat Headers";
      this.showCombatDefaultColumns = true;
      this.showAddMainClass = false;
      this.showGrindingTableEntry = false;
    }
    else if(this.grindingRes.length == 0 && !this.combatPageData.hasMainClass && this.combatPageData.hasDefaultCombatHeaders) {
      this.entryPopupTitle = "Create Main Class";
      this.showAddMainClass = true;
      this.showCombatDefaultColumns = false;
    }
    else {
      if(this.newGrindingResEntry.length == 0){
        if(this.mainClass)
          this.newEntry.userClass = this.mainClass;
          await Promise.all(this.filteredColumns.map(async (col) => {
            if(col.isActive){
              switch(col.headingId){
                case 2: // Location
                  this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0];
                  break;
                case 3: // Time
                  this.newEntry.timeAmount = this.combatEnums.timeAmountEnum[0];
                  break;
                case 5: // Class
                  this.newEntry.userClass = this.mainClass;
                  break;
                case 6: // Server
                  this.newEntry.server = this.combatEnums.serverNamesEnum[0];
                  break;
                case 7: // Combat Types
                  this.newEntry.combatType = this.combatEnums.combatTypesEnum[0];
                  break;
                default:
                  break;
              }
            }
          }));
        this.newGrindingResEntry.push(this.newEntry); this.newEntry.grindingId = 1;
      }
        
      this.entryPopupTitle = "Add New Entry";
      this.showGrindingTableEntry = true;
      this.showAddMainClass = false;
      this.showCombatDefaultColumns = false;
    }
    this.showAddEntryPopup = true;
  }

  public onRowEditInit(entry: any) {
    this.newGrindingResEntry[entry.grindingId] = {...entry};
  }

  public async addEntry() {
    this.loader.startBackground();
    await this.combatService.saveGrindingEntry(this.newEntry).then(res => {
      console.log(res);
      this.grindingRes.push(res as GrindingData);
      this.showGrindingTableEntry = false;
      this.showAddEntryPopup = false;
      this.loader.stopBackground();
    },err => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add entry.', life: 2600 });
      this.loader.stopBackground();
    });
  }
}
