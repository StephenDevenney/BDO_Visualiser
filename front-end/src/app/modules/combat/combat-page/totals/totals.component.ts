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
  public selectedLocation: number;
  public locationSelected: boolean = false;

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }
  
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.combatService.getTotals().subscribe( res => {
      this.totals = res as CombatTotals;
      // this.isLoaded = true;
    });

    this.combatService.getLocations().subscribe( res => {
      this.locations = res as Array<Location>;
      console.log(this.locations);
      this.isLoaded = true;
    });
  }

  public loadTrashLoot(e: any) {
    let locationToLoad = e.value;
    if(locationToLoad === null)
      this.locationSelected = false;
    else {
      this.combatService.getTrashLootTotals(locationToLoad.locationId).subscribe( res => {
        this.trashTotals = res as TrashLootTotals;
        console.log(this.trashTotals);
        this.locationSelected = true;
        // console.log(this.trashTotals.trashLootTotal);
        // console.log(this.trashTotals.trashLootTotal.trashLootAmount);
      });
    }

  }

}
