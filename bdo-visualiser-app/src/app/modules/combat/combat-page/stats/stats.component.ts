import { Component, Injector, OnInit } from '@angular/core';
import { CombatStatsViewModel } from 'src/server/shared/viewModels/combatViewModels';
import { BaseComponent } from '../../../../shared/components/base.component';
import { CombatService } from '../../combat.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent extends BaseComponent implements OnInit {
  public isLoaded: boolean = false;
  public locations: Array<Location> = new Array<Location>();
  public selectedLocation: number = 0;
  public locationSelected: boolean = false;
  private carouselTabs: any[] = [{id: 1, label: "Trash Loot"},{ id: 2, label: "Trash Loot By Location" },{id: 3, label: "Agris"},{ id: 4, label: "Afuaru" }];
  public combatStats: CombatStatsViewModel = new CombatStatsViewModel();

  constructor(private injector: Injector,
              private combatService: CombatService) {
    super(injector);
  }
  /*
    Max Weekly Metrics
  */
  ngOnInit(): void {
    this.combatService.getCombatStatsTabData().then((res: CombatStatsViewModel) => {
      this.combatStats = res;
      console.log(res)
    }).catch(() => {

    });
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
  todo: track luckiest server when item drops added
*/