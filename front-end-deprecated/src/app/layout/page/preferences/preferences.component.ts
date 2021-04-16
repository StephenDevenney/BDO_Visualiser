import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'preferences',
  templateUrl: './preferences.component.html'
})
export class PreferencesComponent implements OnInit {
  @Output() closeTab = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public closeSideTab() {
    this.closeTab.emit(true);
  }

}
