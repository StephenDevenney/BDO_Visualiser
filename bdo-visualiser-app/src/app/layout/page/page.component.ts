import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderType } from './enums/header-type';
import { PageHeaderComponent } from './page-header/page-header.component';

@Component({
  selector: 'page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  @ContentChild(PageHeaderComponent) header!: PageHeaderComponent;
  @ViewChild("pageContent") content!: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    
  }

}
