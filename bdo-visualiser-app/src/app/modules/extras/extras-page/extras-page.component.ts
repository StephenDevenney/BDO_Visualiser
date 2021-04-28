import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'extras-page',
  templateUrl: './extras-page.component.html'
})
export class ExtrasPageComponent extends BaseComponent implements OnInit  {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
