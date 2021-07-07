import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildsViewModel, ClassEditViewModel, ClassRolesEnumViewModel, GearViewModel, UserClassViewModel } from 'src/server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { CombatTypesEnum } from '../../combat/classes/combatEnums';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'class-edit-page',
  templateUrl: './class-edit.component.html'
})
export class ClassEditPageComponent extends BaseComponent implements OnInit  {
  public isLoaded: boolean = false;
  public classId: number = 0;
  public userClassEditPageData: ClassEditViewModel = new ClassEditViewModel();
  public newCombatGear: GearViewModel = new GearViewModel();
  public selectedBuild: GearViewModel = new GearViewModel();

  constructor(private injector: Injector,
              private userClassService: UserClassesService,
              private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(typeof(params['classId']) != "undefined")
        this.classId = params['classId'];
      if(this.classId > 0) {
        this.userClassService.getClassEditData(this.classId).catch(() => {
          this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error loading edit data.', life: 2600 });
          this.router.navigate(["user-classes"]);
        }).then((res: ClassEditViewModel) => {
          this.userClassEditPageData = res;
          this.selectedBuild = this.userClassEditPageData.builds.combat.filter((_: GearViewModel) => _.isActive == true)[0];
          this.isLoaded = true;
          console.log(this.userClassEditPageData);
        });
      }
      else {
        this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error loading edit data.', life: 2600 });
        this.router.navigate(["user-classes"]);
      }
    });
  }

  public async checkCombatBuilds(): Promise<void> {
    if(this.newCombatGear.gearLabel.length > 0) {
      let duplicateCheck: boolean = false;
      await Promise.all(this.userClassEditPageData.builds.combat.map(async (res: GearViewModel) => { 
        if(res.gearLabel === this.newCombatGear.gearLabel)
          duplicateCheck = true;
      })).then(async () => {
        if(duplicateCheck)
          this.messageService.add({ severity:'warn', summary:'Gear build duplicate', detail:'Label is required to be unique.', life: 2600 });
        else
          await this.createCombatBuild();
      });
    }
    else
      this.messageService.add({ severity:'warn', summary:'Gear builds require a name', detail:'Examples: Nouver, Kutum, Tank, Full AP, Accuarcy, Evasion...', life: 2600 });
  }

  public async createCombatBuild(): Promise<void> {
    this.loader.startBackground();
    await this.userClassService.addCombatGearBuild(this.newCombatGear, this.classId).then((res: Array<GearViewModel>) => {
      this.userClassEditPageData.builds.combat = res;
      this.selectedBuild = this.userClassEditPageData.builds.combat.filter((_: GearViewModel) => _.isActive == true)[0];
      this.loader.stopBackground();
    }).catch(() => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error adding gear build.', life: 2600 });
      this.loader.stopBackground();
    });
  }

  public async onGearEdit(build: GearViewModel): Promise<void> {
    if(build.gearLabel.length > 0) {
      this.loader.startBackground();
      await this.userClassService.updateCombatGear(build, this.classId).then((res: Array<GearViewModel>) => {
        this.userClassEditPageData.builds.combat = res;
        this.selectedBuild = this.userClassEditPageData.builds.combat.filter((_: GearViewModel) => _.isActive == true)[0];
        this.loader.stopBackground();
      }).catch(() => {
        this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error updating gear build.', life: 2600 });
        this.loader.stopBackground();
      });
    }
  }

  public async onCombatTypeChanged(e: { originalEvent: MouseEvent, value: CombatTypesEnum }): Promise<void> {
    this.loader.startBackground();
    await this.userClassService.updateCombatType(e.value, this.classId).catch(() => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error updating combat type.', life: 2600 });
      this.loader.stopBackground();
    }).then(() => { this.loader.stopBackground(); });
  }

  public async onUserClassRoleChanged(e: { originalEvent: MouseEvent, value: ClassRolesEnumViewModel }): Promise<void> {
    this.loader.startBackground();
    await this.userClassService.updateUserClassRole(e.value, this.classId).catch(() => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error updating primary role.', life: 2600 });
      this.loader.stopBackground();
    }).then(() => { this.loader.stopBackground(); });
  }

  public async onSelectedBuildChange(newSelectedBuild: GearViewModel): Promise<void> {
    this.loader.startBackground();
    this.userClassEditPageData.builds.combat.filter((_: GearViewModel) => _.isActive == true)[0].isActive = false;
    this.userClassEditPageData.builds.combat.filter((_: GearViewModel) => _.gearScoreId == newSelectedBuild.gearScoreId)[0].isActive = true;
    await this.userClassService.updateUserClassActiveGearScoreId(newSelectedBuild.gearScoreId, this.classId).catch(() => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Internal error updating active build.', life: 2600 });
      this.loader.stopBackground();
    }).then(() => { this.loader.stopBackground(); });
  }
}