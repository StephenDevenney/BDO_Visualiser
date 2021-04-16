import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';


@Component({
  selector: 'fail-stacks-page',
  templateUrl: './fail-stacks-page.component.html'
})
export class FailStacksPageComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
