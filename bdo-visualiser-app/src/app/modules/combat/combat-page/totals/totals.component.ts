import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base.component';
import { CombatTotals, TrashLootTotals } from '../../classes/totals';
import { CombatService } from '../../combat.service';

@Component({
  selector: 'totals',
  templateUrl: './totals.component.html'
})
export class TotalsComponent extends BaseComponent implements OnInit {
  public isLoaded: boolean = false;
  public totals: CombatTotals = new CombatTotals;
  public trashTotals: TrashLootTotals = new TrashLootTotals;
  public locations: Array<Location> = new Array<Location>();
  public selectedLocation: number = 0;
  public locationSelected: boolean = false;

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }
  /*
    Max Weekly Metrics
  */
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  public loadTrashLoot(e: any) {
    let locationToLoad = e.value;
    if(locationToLoad === null)
      this.locationSelected = false;
    else {

    }
  }
  
}

/*
Stats:
Trashloot /hr/day/week/total - (slider?)
afuaru /hr/day/week/total
agris /hr/day/week/total

timeAmount /day/week/total
hrs as class /day/week/total - dropdown to change class

*/