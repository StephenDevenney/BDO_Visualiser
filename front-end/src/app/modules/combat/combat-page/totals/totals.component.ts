import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'totals',
  templateUrl: './totals.component.html'
})
export class TotalsComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
