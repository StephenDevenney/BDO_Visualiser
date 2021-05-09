import { Component, Injector, OnInit } from '@angular/core';
import { CombatStatsByLocationViewModel, CombatStatsViewModel, LocationNamesEnumViewModel } from 'src/server/shared/viewModels/combatViewModels';
import { BaseComponent } from '../../../../shared/components/base.component';
import { CombatService } from '../../combat.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent extends BaseComponent implements OnInit {
  public isLoaded: boolean = false;
  public locations: Array<Location> = new Array<Location>();
  public locationSelected: boolean = false;
  private carouselTabs: any[] = [{id: 1, label: "Trash Loot"},{ id: 2, label: "Location Filter" },{id: 3, label: "Agris"},{ id: 4, label: "Afuaru" }];
  public combatStats: CombatStatsViewModel = new CombatStatsViewModel();
  public selectedLocation: LocationNamesEnumViewModel = new LocationNamesEnumViewModel();
  public locationIsSelected: boolean = false;
  public locationStats: CombatStatsByLocationViewModel = new CombatStatsByLocationViewModel();

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
      console.log(res);
      this.isLoaded = true;
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

  public getSelectedLocationData(e: { orginalEvent: MouseEvent, value: LocationNamesEnumViewModel }) {
    this.loader.startBackground();
    this.combatService.getStatsDataByLocation(e.value).then((res: CombatStatsByLocationViewModel) => {
      console.log(res);
      this.locationStats = res;
      this.loader.stopBackground();
    }).catch(() => {
      this.messageService.add({severity:'error', summary:'Error.', detail:'Error Loading Location.', life: 2600 });
    }).then(() => {
      if(!this.locationIsSelected)
        this.locationIsSelected = true;
    });
  }

  public reloadTabData() {
    this.loader.startBackground();
    if(this.locationIsSelected = true) {
      this.combatService.getStatsDataByLocation(this.selectedLocation).then((res: CombatStatsByLocationViewModel) => {
        this.locationStats = res;
        this.loader.stopBackground();
      }).catch(() => {
        this.messageService.add({severity:'error', summary:'Error.', detail:'Error Loading Location.', life: 2600 });
      }).then(() => {
        if(!this.locationIsSelected)
          this.locationIsSelected = true;
      });
    } 
  }
  
}

/*
  todo: track luckiest server when item drops added
*/