import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../shared/components/base.component';
import { UserClassesService } from '../user-classes.service';

@Component({
  selector: 'class-edit-page',
  templateUrl: './class-edit.component.html'
})
export class ClassEditPageComponent extends BaseComponent implements OnInit  {
  public isLoaded: boolean = false;

  constructor(private injector: Injector,
              private userClassService: UserClassesService) {
    super(injector);
  }

  ngOnInit(): void {
    this.isLoaded = true;
  }
}