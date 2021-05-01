import { Component, Injector, OnInit } from '@angular/core';
import { ClassCreationViewModel, ClassNamesEnumViewModel, ClassRolesEnumViewModel, UserClassViewModel } from '../../../../server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'class-creation-page',
  templateUrl: './class-creation-page.component.html'
})
export class ClassCreationPageComponent extends BaseComponent implements OnInit  {
  public classCreationData: ClassCreationViewModel = new ClassCreationViewModel();
  public classRolesEnumFiltered: Array<ClassRolesEnumViewModel> = new Array<ClassRolesEnumViewModel>();
  public isLoaded: boolean = false;
  public userClassHasBeenSelected: boolean = false;
  public selectedUserClassId: number = 0;

  constructor(private injector: Injector,
              private userClassService: UserClassesService) {
    super(injector);
  }

  ngOnInit(): void {
    this.loader.start();
    this.userClassService.getClassCreationData().then((res: ClassCreationViewModel) => {
      this.classCreationData = res;
      console.log(res);
      this.classRolesEnumFiltered = res.classRolesEnum.filter(_ => _.classRole != "Main");
      if(!res.hasMainUserClass)
        this.classCreationData.newUserClass.classRoleEnum = this.classCreationData.classRolesEnum[0];

      this.isLoaded = true;
    }).catch((err: any) => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Error Loading Data.', life: 2600 });
      // Log Error
    }).then(() => {
      this.loader.stop();
    });
  }

  public async selectClass(e: ClassNamesEnumViewModel) {
    await Promise.all(this.classCreationData.classNamesEnum.map( _ => { _.isSelected = false; }));
    e.isSelected = true;
    this.classCreationData.newUserClass.classNameEnum.className = e.className;
    this.classCreationData.newUserClass.classNameEnum.fileName = e.fileName;
    this.userClassHasBeenSelected = true;
  }

  public async createClass() {
    this.loader.startBackground();
    await this.userClassService.addUserClass(this.classCreationData.newUserClass).then((res: UserClassViewModel) => {
      console.log(res);
      this.router.navigate(["user-classes"]);
    }).catch(() => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Error adding class.', life: 2600 });
    }).then(() => {
      this.loader.stopBackground();
    });
  }
}