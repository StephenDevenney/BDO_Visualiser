import { ChangeDetectorRef, Component, HostListener, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatService } from '../combat.service';
import { GrindingData, GrindingTableHeaders, CombatPageData, VisibleData } from "../classes/grindingTable";
import { UserClass } from '../classes/userClass';
import { ClassNamesEnum, CombatPageEnums, LocationNamesEnum, LocationNamesGroupedEnum } from '../classes/combatEnums';

@Component({
  selector: 'combat-page',
  templateUrl: './combat-page.component.html'
})
export class CombatPageComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector,
              private combatService: CombatService,
              private cdRef:ChangeDetectorRef) {
    super(injector);
  }

  // General
  public rowGroupMetadata: any;
  public stateOptions = [{label: 'Off', value: 0}, {label: 'On', value: 1}];
  public isLoaded: boolean = false;
  public classNames: Array<ClassNamesEnum> = new Array<ClassNamesEnum>();
  public combatEnums: CombatPageEnums = new CombatPageEnums();
  public groupedLocationsEnums: Array<LocationNamesGroupedEnum> = new Array<LocationNamesGroupedEnum>();

  // Grinding Data
  public combatPageData: CombatPageData = new CombatPageData();
  public grindingRes: Array<VisibleData> = new Array<VisibleData>();

  // New Entry
  public newGrindingResEntry: Array<GrindingData> = new Array<GrindingData>();
  public newEntry: GrindingData = new GrindingData();

  // Combat Headers
  public columnSelectOptions: Array<GrindingTableHeaders> = new Array<GrindingTableHeaders>();
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
  public popupHeight: string = "21rem";
  public columnChanged: boolean = false;
  public disableChecks: boolean = false;

  // Upload
  public uploadedFiles: Array<GrindingData> = new Array<GrindingData>();
  public csvRecords: Array<GrindingData> = new Array<GrindingData>();

  public ngOnInit(): void {
    // Load grinding data and organise into row data.
    this.loader.start();
    this.combatService.getCombatPageData().subscribe( (res: CombatPageData) => {
      this.combatPageData = res as CombatPageData;
      this.columnHeaders = this.combatPageData.tableHeaders as Array<GrindingTableHeaders>;
      this.filteredColumns = this.columnHeaders.filter(header => header.isActive == true);
      this.columnSelectOptions = this.columnHeaders.filter(header => header.headingId != 1);
      this.activeClasses = this.combatPageData.activeClasses as Array<UserClass>;
      if(this.combatPageData.hasMainClass)
        this.mainClass = this.activeClasses.filter(uc => uc.classRole == "Main")[0];
      this.grindingRes = this.combatPageData.visibleData;
      this.updateRowGroupMetaData(this.grindingRes);
      this.isLoaded = true;
      this.loader.stop();
    },
    (err: any) => {
      this.loader.stop();
    });

    this.combatService.getCombatEnums().subscribe((res: CombatPageEnums) => {
      this.combatEnums = res;
      console.log(this.combatEnums.locationNamesEnum);
    });
  }

  // Displayed data.
  public async updateRowGroupMetaData(data: string | any[]) {
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
                let previousRowGroup = previousRowData.dateCreated;
                if (date === previousRowGroup)
                    this.rowGroupMetadata[date].size++;
                else
                    this.rowGroupMetadata[date] = { index: i, size: 1 };
            }
        }
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

  public onRowSelect(e: any) {

  }

  public async saveDefaultColumns() {
    if(this.columnChanged) {
      this.loader.startBackground();
      await this.combatService.saveCombatHeaders(this.columnHeaders).then(res => {
          this.combatPageData.hasDefaultCombatHeaders = true;
          this.columnChanged = false;
          this.columnHeaders = res as Array<GrindingTableHeaders>;
      },
      err => {
        this.loader.stopBackground();
        this.messageService.add({severity:'error', summary:'Error', detail:'Combat headers failed to update.', life: 2600 });
      }).then(_ => {
        this.addEntryPopupChecks();
        this.loader.stopBackground();
      });
    }
  }

  public saveMainClass() {
    if(this.mainClass.className.length > 0) {
      this.loader.startBackground();
      this.combatService.addMainClass(this.mainClass).subscribe((res: UserClass) => {
        this.mainClass = res;
        this.combatPageData.hasMainClass = true;
        this.combatPageData.activeClasses.push(this.mainClass);
        this.addEntryPopupChecks();
        this.loader.stopBackground();
      },
      (err: any) => {
        this.loader.stopBackground();
        if(err.message.msg == "Class Role Required.")
          this.messageService.add({severity:'info', summary:'Class Required', detail:'Class Required.', life: 2600 });
        else
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to save class', life: 2600 });
      });
    }
    else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Class Required.', life: 2600 });
    }
  }

  public async addEntryPopupChecks() {
    this.showCombatDefaultColumns = false;
    this.showAddMainClass = false;
    this.showGrindingTableEntry = false;

    this.columnSelectOptions = this.columnHeaders.filter(header => header.headingId != 1);
    if(this.grindingRes.length == 0 && !this.combatPageData.hasDefaultCombatHeaders) {
      this.columnChanged = true;
      this.popupHeight = "32rem";
      this.entryPopupTitle = "Select Default Combat Headers";
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
      this.popupHeight = "21rem";
      this.mainClass = this.activeClasses.filter(_ => _.classRole == "Main")[0];
      await Promise.all(this.filteredColumns.map(async (col) => {
        if(col.isActive){
          switch(col.headingId){
            case 2: // Location
              this.newEntry.grindLocation = this.combatEnums.locationNamesEnum[0].items[0];
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

      this.newGrindingResEntry.push(this.newEntry);
      this.newEntry.grindingId = 1;
      this.entryPopupTitle = "Add New Entry";
      this.showGrindingTableEntry = true;
      this.showAddMainClass = false;
      this.showCombatDefaultColumns = false;
    }
    this.showAddEntryPopup = true;
  }

  public async addEntry() {
    this.loader.startBackground();
    await this.combatService.saveGrindingEntry(this.newEntry).then(res => {
      this.grindingRes.push(res.visibleData as VisibleData);
      this.combatPageData.tableData.push(res.grindingTableEntry as GrindingData);
    }).then(res => {
      this.customSort();
      this.updateRowGroupMetaData(this.grindingRes);
      this.showGrindingTableEntry = false;
      this.showAddEntryPopup = false;
      this.newEntry = new GrindingData();
      this.loader.stopBackground();
    },err => {
      if(err.error.msg == "Class Required.")
        this.messageService.add({severity:'info', summary:'Class Required', detail:'Class Required.', life: 2600 });
      else
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to add entry.', life: 2600 });
      this.loader.stopBackground()
    }).then(res => {
      this.combatService.getCombatEnums().subscribe((res: CombatPageEnums) => {
        this.combatEnums = res as CombatPageEnums;
      });
    });
  }

  public onVisibleColumnChange(event: { itemValue: GrindingTableHeaders; }) {
    this.combatService.updateSingleVisibleColumn(event.itemValue as GrindingTableHeaders).subscribe((res: any) => {
      let updatedHeader = res as GrindingTableHeaders;
      let foundIndex = this.columnHeaders.findIndex(_ => _.headingId == updatedHeader.headingId);
      if(foundIndex >= 0)
        this.columnSelectOptions[foundIndex].isActive = updatedHeader.isActive;

      this.cdRef.detectChanges();
    },
    (err: any) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to updateColumn.', life: 2600 });
    });
  }

  public toggleAddEntryColumns(target: string) {
    if(target == "columnChooser") {
      this.entryPopupTitle = "Select Combat Headers";
      this.showCombatDefaultColumns = true;
      this.showGrindingTableEntry = false;
      this.popupHeight = "32rem";
    }
    else if(target == "addEntry") {
      this.entryPopupTitle = "Add New Entry";
      this.showCombatDefaultColumns = false;
      this.showGrindingTableEntry = true;
      this.popupHeight = "21rem";
    }
  }

  public exportCSV() {
    // const options = { 
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalSeparator: '.',
    //   showLabels: true, 
    //   showTitle: false,
    //   title: 'Title',
    //   useTextFile: false,
    //   useBom: true,
    //   useKeysAsHeaders: true,
    //   filename: 'grindingData'
    // };

    // const csvExporter = new ExportToCsv(options); 
    // csvExporter.generateCsv(this.grindingRes);
  }

  public async onDataUpload(event: any): Promise<any> {
    // await Promise.all(event.files.map(async (file) => {
    //   await this.uploadedFiles.push(file);
    // }));

    // this.ngxCsvParser.parse(event.files[0], { header: true, delimiter: ',' })
    // .pipe().subscribe((res: any) => {
    //   this.uploadedFiles = res;
    //   if(this.uploadedFiles.length == 0)
    //     this.messageService.add({severity:'error', summary:'Error', detail:'Failed to upload data', life: 2600 });
    // }, (error: NgxCSVParserError) => {
    // });  

    // this.loader.startBackground();
    // if(this.uploadedFiles.length > 0)
    //   await this.combatService.uploadGrindingData(this.uploadedFiles).then(res => {

    // },
    // err => {
    //   this.loader.stopBackground();
    //   this.messageService.add({severity:'error', summary:'Error', detail:'Failed to upload data', life: 2600 });
    // }).then(_ => {

    //   this.loader.stopBackground();
    // });
  }
}
