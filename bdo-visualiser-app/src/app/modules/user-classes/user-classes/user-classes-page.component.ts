import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'user-classes-page',
  templateUrl: './user-classes-page.component.html'
})
export class UserClassesPageComponent extends BaseComponent implements OnInit  {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
