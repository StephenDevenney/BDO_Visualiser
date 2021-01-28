import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base.component';

@Component({
  selector: 'graphs',
  templateUrl: './graphs.component.html'
})
export class GraphsComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
