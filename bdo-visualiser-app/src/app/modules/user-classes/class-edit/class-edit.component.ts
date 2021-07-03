import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildsViewModel, ClassEditViewModel, GearViewModel, UserClassViewModel } from 'src/server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'class-edit-page',
  templateUrl: './class-edit.component.html'
})
export class ClassEditPageComponent extends BaseComponent implements OnInit  {
  public isLoaded: boolean = false;
  public classId: number = 0;
  public gearBuilds: BuildsViewModel = new BuildsViewModel();
  public newCombatGear: GearViewModel = new GearViewModel();

  constructor(private injector: Injector,
              private userClassService: UserClassesService,
              private route: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if(typeof(params['classId']) != "undefined")
        this.classId = params['classId'];
      if(this.classId > 0) {
        this.userClassService.getClassEditData(this.classId).then((res: ClassEditViewModel) => {
          console.log(res);
          this.gearBuilds = res.builds;
          this.isLoaded = true;
        }).catch(() => {
    
        });
      }
      else {
        this.router.navigate(["user-classes"]);
      }
    });
  }

  public async createCombatBuild(): Promise<void> {
    if(this.newCombatGear.gearLabel.length > 0) {
      this.loader.startBackground();
      await this.userClassService.addCombatGearBuild(this.newCombatGear, this.classId).then((res: Array<GearViewModel>) => {
        this.gearBuilds.combat = res;
        this.loader.stopBackground();
      }).catch(() => {
        this.messageService.add({ severity:'error', summary:'Error', detail:'Error adding gear build.', life: 2600 });
        this.loader.stopBackground();
      });
    }
    else
      this.messageService.add({ severity:'warn', summary:'Gear builds require a name', detail:'Examples: Nouver, Kutum, Tank, Full AP, Accuarcy, Evasion...', life: 2600 });
  }

  public async onGearEdit(build: GearViewModel): Promise<void> {
    console.log(build);
  }
}