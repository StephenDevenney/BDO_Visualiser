import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base.component';
import { CombatTotals } from '../../classes/totals';
import { CombatService } from '../../combat.service';

@Component({
  selector: 'totals',
  templateUrl: './totals.component.html'
})
export class TotalsComponent extends BaseComponent implements OnInit {
  public isLoaded: boolean = false;
  public totals: CombatTotals = new CombatTotals;
  public locations: Array<Location> = new Array<Location>();

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }

  ngOnInit(): void {
    this.combatService.getTotals().subscribe( res => {
      this.totals = res as CombatTotals;
      // this.isLoaded = true;
    });

    this.combatService.getLocations().subscribe( res => {
      console.log(res);
      // this.totals = res as CombatTotals;
      this.isLoaded = true;
    });
  }

}
