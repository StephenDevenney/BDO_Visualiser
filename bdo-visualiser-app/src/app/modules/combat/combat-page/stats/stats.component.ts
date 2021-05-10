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
    this.loadCombatStatData();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadLocationData();
  }

  public loadTrashLoot(e: any) {
    let locationToLoad = e.value;
    if(locationToLoad === null)
      this.locationSelected = false;
    else {

    }
  }

  public async getSelectedLocationData(e: { orginalEvent: MouseEvent, value: LocationNamesEnumViewModel }) {
    this.selectedLocation = e.value;
    await this.loadLocationData();
  }

  public async reloadTabData() {
    if(this.locationIsSelected = true)
      await this.loadLocationData();
    await this.loadCombatStatData();
  }

  public async loadLocationData(): Promise<void> {
    this.loader.startBackground();
    await this.combatService.getStatsDataByLocation(this.selectedLocation).then((res: CombatStatsByLocationViewModel) => {
      this.locationStats = res;
      this.loader.stopBackground();
    }).catch(() => {
      this.messageService.add({severity:'error', summary:'Error.', detail:'Error Loading Location.', life: 2600 });
      this.loader.stopBackground();
    }).then(() => {
      if(!this.locationIsSelected)
        this.locationIsSelected = true;
    });
  }

  public async loadCombatStatData(): Promise<void> {
    this.combatService.getCombatStatsTabData().then((res: CombatStatsViewModel) => {
      this.combatStats = res;
      this.isLoaded = true;
    }).catch(() => {

    });
  }
  
}

/*
  todo: track luckiest server when item drops added
*/