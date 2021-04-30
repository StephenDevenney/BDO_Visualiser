import { Component, Injector, OnInit } from '@angular/core';
import { CharacterCardsViewModel, UserClassViewModel } from '../../../../server/shared/viewModels/userClassViewModel';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'user-classes-page',
  templateUrl: './user-classes-page.component.html'
})
export class UserClassesPageComponent extends BaseComponent implements OnInit  {
  public pageData: CharacterCardsViewModel = new CharacterCardsViewModel();
  public isLoaded: boolean = false;

  constructor(private injector: Injector,
              private userClassService: UserClassesService) {
    super(injector);
  }

  ngOnInit(): void {
    /*
      Ap + Ap Bracket
      Aap + Aap Bracket
      Dp + Dp Bracket
      Hours Grinded Total.
      Classname
      classRole
    */
   this.loader.start();
    this.userClassService.getClassCardsData().then((res: CharacterCardsViewModel) => {
      this.pageData = res;
      this.isLoaded = true;
      console.log(res);
    }).catch(() => {

    }).then(() => {
      this.loader.stop();
    });
  }

}
