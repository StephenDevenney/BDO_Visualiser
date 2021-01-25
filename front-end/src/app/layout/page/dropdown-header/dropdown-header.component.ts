import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dropdown-header',
  templateUrl: './dropdown-header.component.html'
})
export class DropdownHeaderComponent implements OnInit {
  @Output() sideTabToOpen = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public openSideTab(tabId: number) {
    this.sideTabToOpen.emit(tabId);
  }
}
