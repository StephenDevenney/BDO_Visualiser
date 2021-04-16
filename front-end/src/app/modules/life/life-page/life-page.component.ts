import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'life-page',
  templateUrl: './life-page.component.html'
})
export class LifePageComponent extends BaseComponent implements OnInit  {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
