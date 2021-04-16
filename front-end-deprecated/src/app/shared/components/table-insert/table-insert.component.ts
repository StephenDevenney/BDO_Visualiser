import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'table-insert',
  templateUrl: './table-insert.component.html'
})
export class TableInsertComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
