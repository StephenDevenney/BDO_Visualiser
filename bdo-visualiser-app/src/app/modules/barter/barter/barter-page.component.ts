import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'barter-page',
  templateUrl: './barter-page.component.html'
})
export class BarterPageComponent extends BaseComponent implements OnInit  {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
