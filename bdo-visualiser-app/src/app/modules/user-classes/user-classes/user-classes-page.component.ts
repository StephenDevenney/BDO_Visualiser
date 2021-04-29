import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'user-classes-page',
  templateUrl: './user-classes-page.component.html'
})
export class UserClassesPageComponent extends BaseComponent implements OnInit  {

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
    this.userClassService.getClassCardsData().then((_: void) => {
      
    }).catch(() => {

    });
  }

}
