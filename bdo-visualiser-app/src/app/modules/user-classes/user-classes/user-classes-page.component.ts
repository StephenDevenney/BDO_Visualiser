import { Component, Injector, OnInit } from '@angular/core';
import { CharacterCardsViewModel, UserClassViewModel } from '../../../../server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'user-classes-page',
  templateUrl: './user-classes-page.component.html'
})
export class UserClassesPageComponent extends BaseComponent implements OnInit  {
  public userClasses: Array<UserClassViewModel> = new Array<UserClassViewModel>();
  public isLoaded: boolean = false;

  constructor(private injector: Injector,
              private userClassService: UserClassesService) {
    super(injector);
  }

  ngOnInit(): void {
   this.loader.start();
    this.userClassService.getClassCardsData().then((res: Array<UserClassViewModel>) => {
      this.userClasses = res;
      this.isLoaded = true;
      console.log(this.userClasses);
    }).catch(() => {

    }).then(() => {
      this.loader.stop();
    });
  }

}
