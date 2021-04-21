import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';

@Component({
  selector: 'scrolls-page',
  templateUrl: './scrolls-page.component.html'
})
export class ScrollsPageComponent extends BaseComponent implements OnInit  {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
