import { Component, Injector, OnInit } from '@angular/core';
import { ClassCreationViewModel, ClassNamesEnumViewModel, ClassRolesEnumViewModel, CombatTypesEnumViewModel, UserClassViewModel } from '../../../../server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'class-creation-page',
  templateUrl: './class-creation-page.component.html'
})
export class ClassCreationPageComponent extends BaseComponent implements OnInit  {
  public classCreationData: ClassCreationViewModel = new ClassCreationViewModel();
  public classRolesEnumFiltered: Array<ClassRolesEnumViewModel> = new Array<ClassRolesEnumViewModel>();
  public combatTypesEnumUnfiltered: Array<CombatTypesEnumViewModel> = new Array<CombatTypesEnumViewModel>();
  public isLoaded: boolean = false;
  public userClassHasBeenSelected: boolean = false;

  constructor(private injector: Injector,
              private userClassService: UserClassesService) {
    super(injector);
  }

  ngOnInit(): void {
    this.loader.start();
    this.userClassService.getClassCreationData().then((res: ClassCreationViewModel) => {
      this.classCreationData = res;
      this.classRolesEnumFiltered = res.classRolesEnum;
      this.combatTypesEnumUnfiltered = res.combatTypesEnum;
      this.isLoaded = true;
    }).catch((err: any) => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Error Loading Data.', life: 2600 });
    }).then(() => {
      this.classCreationData.newUserClass.combatTypeEnum = this.classCreationData.combatTypesEnum[0];
      this.loader.stop();
    });
  }

  public async selectClass(e: ClassNamesEnumViewModel) {
    await Promise.all(this.classCreationData.classNamesEnum.map( _ => { _.isSelected = false; }));
    e.isSelected = true;
    this.classCreationData.newUserClass.classNameEnum.classId = e.classId;
    this.classCreationData.newUserClass.classNameEnum.className = e.className;
    this.classCreationData.newUserClass.classNameEnum.fileName = e.fileName;
    this.classCreationData.newUserClass.classNameEnum.isSelected = true;
    this.userClassHasBeenSelected = true;
    this.filterCombatTypes();
  }

  public async createClass() {
    if(this.classCreationData.newUserClass.gear.gearLabel.length > 0) {
      this.loader.startBackground();
      await this.userClassService.addUserClass(this.classCreationData.newUserClass).then((res: UserClassViewModel) => {
        this.router.navigate(["user-classes"]);
      }).catch(() => {
        this.messageService.add({ severity:'error', summary:'Error', detail:'Error adding class.', life: 2600 });
      }).then(() => {
        this.loader.stopBackground();
        this.messageService.add({ severity:'info', summary:'How To Update', detail:'You can add more gear builds or alter existing for a specific character by clicking edit character.', life: 2600 });
      });
    } 
    else
      this.messageService.add({ severity:'warn', summary:'Gear builds require a name', detail:'Examples: Nouver, Kutum, Tank, Full AP, Accuarcy, Evasion...', life: 2600 });
  }

  public async onCombatTypeChanged(e: { originalEvent: MouseEvent, value: CombatTypesEnumViewModel }): Promise <void> {
    this.filterCombatTypes();
  }

  private async filterCombatTypes(): Promise<void> {
    this.classCreationData.combatTypesEnum = this.combatTypesEnumUnfiltered;
    if(this.classCreationData.newUserClass.classNameEnum.classId == 2)
      this.classCreationData.combatTypesEnum = this.classCreationData.combatTypesEnum.filter((res: CombatTypesEnumViewModel) => res.combatTypeId != 3);
    else if(this.classCreationData.newUserClass.classNameEnum.classId == 16)
      this.classCreationData.combatTypesEnum = this.classCreationData.combatTypesEnum.filter((res: CombatTypesEnumViewModel) => res.combatTypeId != 2);
  }
}