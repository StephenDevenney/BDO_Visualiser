import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { GrindingData, GrindingTableHeaders, CombatPageData } from "../classes/grindingTable";
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
  public classNames: Array<ClassNames> = new Array<ClassNames>();

  // Grinding Data
  public combatPageData: CombatPageData;
  public grindingRes: Array<GrindingData> = new Array<GrindingData>();
  public newGrindingResEntry: Array<GrindingData> = new Array<GrindingData>();
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
      this.activeClasses = this.combatPageData.activeClasses as Array<UserClass>;
      if(this.combatPageData.hasMainClass)
        this.mainClass = this.activeClasses.filter(uc => uc.classRole == "Main")[0];

      this.grindingRes = this.combatPageData.tableData;
      this.updateRowGroupMetaData(this.grindingRes);
      this.isLoaded = true;
      this.loader.stop();
    },
    err => {
      this.loader.stop();
    });

    this.combatService.getAllClassNames().subscribe(res => {
      this.classNames = res as Array<ClassNames>;
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

  public async saveDefaultColumns(): Promise<any> {
    this.loader.startBackground();
    await this.combatService.saveCombatHeaders(this.columnHeaders).then(async res => {
      if(res == true)
        this.combatPageData.hasDefaultCombatHeaders = true;
      
      this.loader.stopBackground();
    },
    err => {
      this.loader.stopBackground();
      this.messageService.add({severity:'error', summary:'Error', detail:'Combat headers failed to update.', life: 2600 });
    });

    this.addEntryPopupChecks();
  }

  public saveMainClass() {
    if(this.mainClass.className.length > 0) {
      this.loader.startBackground();
      this.combatService.addMainClass(this.mainClass).subscribe(res => {
        this.mainClass = res as UserClass;
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

  public addEntryPopupChecks() {
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
      if(this.newGrindingResEntry.length == 0)
        this.newGrindingResEntry.push(this.newEntry); this.newEntry.grindingId = 1;
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

  // public add(table){
  //   this.onRowEditInit(this.cars2[this.cars2.length - 1]);
  // }
}
