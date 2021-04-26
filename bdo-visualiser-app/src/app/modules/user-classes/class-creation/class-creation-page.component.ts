import { Component, Injector, OnInit } from '@angular/core';
import { ClassNamesEnumViewModel } from 'src/server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';
import { remote } from 'electron';
import { app } from 'electron';

@Component({
  selector: 'class-creation-page',
  templateUrl: './class-creation-page.component.html'
})
export class ClassCreationPageComponent extends BaseComponent implements OnInit  {
  public classNamesEnum: Array<ClassNamesEnumViewModel> = new Array<ClassNamesEnumViewModel>();
  public isLoaded: boolean = false;

  constructor(private injector: Injector,
              private userClassService: UserClassesService) {
    super(injector);
  }

  ngOnInit(): void {
    this.loader.start();
    this.userClassService.getClassNameEnums().then((res: Array<ClassNamesEnumViewModel>) => {
      this.classNamesEnum = res;
      this.isLoaded = true;
    }).catch((err: any) => {
      this.messageService.add({ severity:'error', summary:'Error', detail:'Error Loading Data.', life: 2600 });
      // Log Error
    }).then(() => {
      this.loader.stop();
    });

    
    // console.log(remote.app.getPath('userData') + "\\");
    // console.log(remote.app.getAppPath() + "\\src\\assets\\images\\classPortraits\\{{item.className}}.PNG");
  }

}