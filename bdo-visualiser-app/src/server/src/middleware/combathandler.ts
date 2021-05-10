import { AgrisEnumEntity, CombatHeadersEntity, CombatStatsEntity, GrindingDataEntity, GrindingTableHeadersEntity, LocationNamesEnumEntity, ServerNamesEnumEntity, TerritoryEnumEntity, TimeAmountEnumEntity } from '../../shared/entities/combatEntities';
import { AgrisEnumContext, ColumnHeadersContext, CombatSettingsContext, CombatStatsContext, CombatStatsHoursContext, CombatTableHeadersContext, GrindingDataContext, LocationsEnumContext, ServerEnumContext, TerritoryEnumContext, TimeEnumContext } from '../sqlContext/combatContext';
import { AgrisEnumViewModel, CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, CombatStatsByLocationViewModel, CombatStatsViewModel, CombatTypeCountViewModel, GrindingDataViewModel, HoursStatsViewModel, LocationNamesEnumViewModel, LocationNamesGroupedEnumViewModel, LocationsCountViewModel, PreviousCombatValuesViewModel, ServerCountViewModel, ServerNamesEnumViewModel, StatViewModel, TerritoryCountViewModel, TimeAmountEnumViewModel, UserClassCountViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { ClassNamesEnumViewModel, ClassRolesEnumViewModel, CombatTypesEnumViewModel, GearViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { ClassNamesEnumEntity, CombatTypesEnumEntity, UserClassEntity } from '../../shared/entities/userClassEntities';
import { GearContext, ClassNamesEnumContext, CombatTypesEnumContext, UserClassContext } from '../sqlContext/userClassContext';
import { UserClassHandler } from './userClassHandler';
import { Calculations } from '../../../server/shared/calc/calculations';

export class CombatPageDataHandler {

    public async getCombatData(): Promise<CombatPageDataViewModel> {
        let hasDefaultCombatHeaders = (await new CombatSettingsContext().get()).hasDefaultCombatHeaders;
        let gthVM = new Array<CombatHeadersViewModel>();
        await new CombatTableHeadersContext().getAll().then((_ : Array<GrindingTableHeadersEntity>) => {
            _.forEach(row => {
                gthVM.push(new CombatHeadersViewModel(row.headingId,  row.field, row.header, row.isActive));
            });
        });

        let hasMainClass = true;
        let acVM = await new UserClassHandler().getUserClasses();
        // console.log(acVM);
        if(acVM.length == 0)
            hasMainClass = false
        /* 
            VisibleData is what the user will see on screen.
            GrindingData is used as a front-end data source.
        */
        let gdVM = new Array<GrindingDataViewModel>();
        let vdVM = new Array<VisibleDataViewModel>();
        await new GrindingDataContext().getAll().then((_ : Array<GrindingDataEntity>) => {
            _.forEach(row => {
                let timeDescription = row.timeAmount + " Minutes";
                let afuaruSpawns = "-";
                let agrisBurnt = "";
                if(row.afuaruSpawnable)
                    afuaruSpawns = row.afuaruSpawns.toString();
                if(row.agrisAmount > 0 && row.agrisDayDescription.length > 0)
                    agrisBurnt = row.agrisAmount + " (" + row.agrisDayDescription + ")";
                else 
                    agrisBurnt = row.agrisAmount.toString();

                vdVM.push(new VisibleDataViewModel(row.grindingId, row.dateCreated, row.locationName, timeDescription, row.trashLootAmount, row.className, row.serverDescription, row.combatTypeName, row.agrisAmount, afuaruSpawns));
                gdVM.push(new GrindingDataViewModel(row.grindingId, row.userClassId, row.dateCreated, new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, row.recommendedAP), new TimeAmountEnumViewModel(row.timeId, row.timeAmount), row.trashLootAmount, new UserClassViewModel(row.userClassId, new ClassNamesEnumViewModel(row.classNameId, row.className, row.fileName), new ClassRolesEnumViewModel(row.classRoleId, row.classRoleName), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription), new ServerNamesEnumViewModel(row.serverId, row.serverDescription, row.isElviaRealm), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new AgrisEnumViewModel(row.agrisId, agrisBurnt), row.afuaruSpawns));
            });
        });
        
        return new CombatPageDataViewModel(gthVM, gdVM, vdVM, hasDefaultCombatHeaders, acVM, hasMainClass);
    }

    public async addEntry(entry: GrindingDataViewModel, combatHeaders: Array<CombatHeadersViewModel>): Promise<VisibleDataViewModel> {
        let eE = await convertToEntity(entry, combatHeaders);
        await new GrindingDataContext().insert(eE);
        let gdE = await new GrindingDataContext().getMostRecent();
        let afuaruSpawns = "-";
        if(gdE.afuaruSpawnable)
            afuaruSpawns = gdE.afuaruSpawns.toString();
        return new VisibleDataViewModel(gdE.grindingId, gdE.dateCreated, gdE.locationName, gdE.timeAmount.toString() + " Minutes", gdE.trashLootAmount, gdE.className, gdE.serverDescription, gdE.combatTypeName, gdE.agrisAmount, afuaruSpawns);

        async function convertToEntity(eVM: GrindingDataViewModel, headers: Array<CombatHeadersViewModel>): Promise<GrindingDataEntity> {
            let res: GrindingDataEntity = new GrindingDataEntity();
            if(headers.filter(_ => _.header == "Location")[0].isActive)
                res.locationId = eVM.grindLocation.locationId;
            res.userClassId = eVM.userClass.classId;
            if(headers.filter(_ => _.header == "Time")[0].isActive)
                res.timeId = eVM.timeAmount.timeId;
            if(headers.filter(_ => _.header == "Server")[0].isActive)
                res.serverId = eVM.server.serverId;
            if(headers.filter(_ => _.header == "Combat Type")[0].isActive)
                res.combatTypeId = eVM.combatType.combatTypeId;
            else 
                res.combatTypeId = eVM.userClass.combatTypeEnum.combatTypeId;
            if(headers.filter(_ => _.header == "Agris")[0].isActive)
                res.agrisId = eVM.agris.agrisId;
            if(headers.filter(_ => _.header == "Afuaru Spawns")[0].isActive && eVM.grindLocation.afuaruSpawnable)
                res.afuaruSpawns = eVM.afuaruSpawns;
            
            res.gearScoreId = (await new GearContext().getViaClassId(eVM.userClass.classId)).gearScoreId;
            res.trashLootAmount = eVM.trashLootAmount;

            return res;
        }
    }
}

export class CombatPageNewEntryHandler {
    public async getCombatNewEntryData(): Promise<CombatPageEnumsViewModel> {
        let classNamesEnum = new Array<ClassNamesEnumViewModel>();
        await new ClassNamesEnumContext().getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                classNamesEnum.push(new ClassNamesEnumViewModel(row.classId, row.className));
            });
        });

        let locationNamesEnum = new Array<LocationNamesGroupedEnumViewModel>();
        await new SharedCombatFunctions().getGroupedLocations().then((res: Array<LocationNamesGroupedEnumViewModel>) => {
            locationNamesEnum = res;
        });

        let serverNamesEnum = new Array<ServerNamesEnumViewModel>();
        await new ServerEnumContext().getAll().then((_: Array<ServerNamesEnumEntity>) => {
            _.forEach(row => {
                serverNamesEnum.push(new ServerNamesEnumViewModel(row.serverId, row.serverName, row.isElviaRealm));
            });
        });

        let combatTypesEnum = new Array<CombatTypesEnumViewModel>();
        await new CombatTypesEnumContext().getNewEntryCombatTypes().then((_: Array<CombatTypesEnumEntity>) => {
            _.forEach(row => {
                combatTypesEnum.push(new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName));
            });
        });

        let timeAmountEnum = new Array<TimeAmountEnumViewModel>();
        await new TimeEnumContext().getAll().then((_: Array<TimeAmountEnumEntity>) => {
            _.forEach(row => {
                timeAmountEnum.push(new TimeAmountEnumViewModel(row.timeId, row.timeAmount));
            });
        });

        let agrisEnum = new Array<AgrisEnumViewModel>();
        await new AgrisEnumContext().getAll().then((_: Array<AgrisEnumEntity>) => {
            _.forEach(row => {
                let agrisBurnt = "";
                if(row.agrisAmount > 0 && row.agrisDayDescription.length > 0)
                    agrisBurnt = row.agrisAmount + " (" + row.agrisDayDescription + ")";
                else 
                    agrisBurnt = row.agrisAmount.toString();
                agrisEnum.push(new AgrisEnumViewModel(row.agrisId, agrisBurnt));
            });
        });

        let acVM = await new UserClassHandler().getUserClasses();
        let previousEntry = new PreviousCombatValuesViewModel();
        await new GrindingDataContext().getMostRecent().then((_: GrindingDataEntity) => {
            if(typeof(_) != "undefined") {
                previousEntry.combatType = new CombatTypesEnumViewModel(_.combatTypeId, _.combatTypeName);
                previousEntry.grindLocation = new LocationNamesEnumViewModel(_.locationId, _.territoryId, _.locationName, _.territoryName, _.recommendedLevel, _.recommendedAP);
                previousEntry.server = new ServerNamesEnumViewModel(_.serverId, _.serverDescription, _.isElviaRealm);
                previousEntry.timeAmount = new TimeAmountEnumViewModel(_.timeId, _.timeAmount);
                previousEntry.userClass = new UserClassViewModel(_.userClassId, new ClassNamesEnumViewModel(_.classNameId, _.className, _.fileName), new ClassRolesEnumViewModel(_.classRoleId, _.classRoleName), new CombatTypesEnumViewModel(_.combatTypeId, _.combatTypeName), new GearViewModel(_.ap, _.aap, _.dp, _.gearScore), _.classDescription);    
                let agrisBurnt = "";
                if(_.agrisAmount > 0 && _.agrisDayDescription.length > 0)
                    agrisBurnt = _.agrisAmount + " (" + _.agrisDayDescription + ")";
                else 
                    agrisBurnt = _.agrisAmount.toString();
                previousEntry.agris = new AgrisEnumViewModel(_.agrisId, agrisBurnt);
            }
        });

        return new CombatPageEnumsViewModel(classNamesEnum, locationNamesEnum, serverNamesEnum, combatTypesEnum, timeAmountEnum, agrisEnum, previousEntry, acVM);
    }
}

export class ColumnHeadersHandler {
    public async getDefaultColumns(): Promise<Array<CombatHeadersViewModel>> {
        let combatHeaders = new Array<CombatHeadersEntity>();
        await new ColumnHeadersContext().getAll().then((_: Array<CombatHeadersEntity>) => {
            _.forEach(row => {
                combatHeaders.push(new CombatHeadersViewModel(row.headingId, row.field, row.header, row.isActive));
            });
        });
        return combatHeaders;
    }
    public async updateSingleVisibleColumn(column: CombatHeadersViewModel): Promise<void> {
        await new ColumnHeadersContext().update(column.headingId, column.isActive);
        return;
    }

    public async toggleFullHeaders(fullHeaders: boolean): Promise<void> {
        await new ColumnHeadersContext().toggleFullHeaders(fullHeaders);
        return; 
    }
}

export class CombatStatsTabHandler { 
    public async getCombatStats(): Promise<CombatStatsViewModel> {
        let stats: CombatStatsViewModel = new CombatStatsViewModel();
        await getTrashLootStats().then((res: CombatStatsViewModel) => {
            stats.trashLootAmount = res.trashLootAmount;
            stats.afuaruSpawns = res.afuaruSpawns;
            stats.timeAmount = res.timeAmount;
        });

        await getFavourites().then((res: CombatStatsViewModel) => {
            stats.serverCount = res.serverCount;
            stats.combatTypeCount = res.combatTypeCount;
            stats.locationCount = res.locationCount;
            stats.territoryCount = res.territoryCount;
            stats.userClassCount = res.userClassCount;
            stats.locationsGrouped = res.locationsGrouped;
        });

        return stats;

        async function getTrashLootStats(): Promise<CombatStatsViewModel> {
            let calc: Calculations = new Calculations();
            let statsReturn: CombatStatsViewModel = new CombatStatsViewModel();
            await new CombatStatsContext().getAll(calc.calcCurrentDate(), calc.calcWeekStartDate(), calc.calcMonthStartDate(), calc.calcYearStartDate()).then((row: Array<CombatStatsEntity>) => {
                statsReturn.trashLootAmount.average = row[0].trashLootAmount;
                statsReturn.trashLootAmount.daily = row[1].trashLootAmount;
                statsReturn.trashLootAmount.weekly = row[2].trashLootAmount;
                statsReturn.trashLootAmount.monthly = row[3].trashLootAmount;
                statsReturn.trashLootAmount.yearly = row[4].trashLootAmount;
                statsReturn.trashLootAmount.total = row[5].trashLootAmount;

                statsReturn.afuaruSpawns.average = row[0].afuaruSpawns;
                statsReturn.afuaruSpawns.daily = row[1].afuaruSpawns;
                statsReturn.afuaruSpawns.weekly = row[2].afuaruSpawns;
                statsReturn.afuaruSpawns.monthly = row[3].afuaruSpawns;
                statsReturn.afuaruSpawns.yearly = row[4].afuaruSpawns;
                statsReturn.afuaruSpawns.total = row[5].afuaruSpawns;

                statsReturn.timeAmount.average = row[0].timeAmount;
                statsReturn.timeAmount.daily = row[1].timeAmount;
                statsReturn.timeAmount.weekly = row[2].timeAmount;
                statsReturn.timeAmount.monthly = row[3].timeAmount;
                statsReturn.timeAmount.yearly = row[4].timeAmount;
                statsReturn.timeAmount.total = row[5].timeAmount;
            });

            return statsReturn;
        }

        async function getFavourites(): Promise<CombatStatsViewModel> {
            let statsReturn: CombatStatsViewModel = new CombatStatsViewModel();
            let scVM = new Array<ServerCountViewModel>();
            await new ServerEnumContext().getServerCount().then((row: Array<ServerNamesEnumEntity>) => {
                row.forEach((_: ServerNamesEnumEntity) => {
                    scVM.push(new ServerCountViewModel(_.serverName, _.serverCount, _.serverName + " - " + _.serverCount));
                });
            });
            statsReturn.serverCount = scVM;
    
            let ctcVM = new Array<CombatTypeCountViewModel>();
            await new CombatTypesEnumContext().getCombatTypeCount().then((row: Array<CombatTypesEnumEntity>) => {
                row.forEach((_: CombatTypesEnumEntity) => {
                    ctcVM.push(new CombatTypeCountViewModel(_.combatTypeName, _.combatTypeCount, _.combatTypeName + " - " + _.combatTypeCount));
                });
            });
            statsReturn.combatTypeCount = ctcVM;
    
            let lcVM = new Array<LocationsCountViewModel>();
            await new LocationsEnumContext().getLocationCount().then((row: Array<LocationNamesEnumEntity>) => {
                row.forEach((_: LocationNamesEnumEntity) => {
                    lcVM.push(new LocationsCountViewModel(_.locationName, _.locationCount, _.locationName + " - " + _.locationCount));
                });
            });
            statsReturn.locationCount = lcVM;

            await new SharedCombatFunctions().getGroupedLocations().then((res: Array<LocationNamesGroupedEnumViewModel>) => {
                statsReturn.locationsGrouped = res;
            });
    
            let tcVM = new Array<TerritoryCountViewModel>();
            await new LocationsEnumContext().getTerritoryCount().then((row: Array<LocationNamesEnumEntity>) => {
                row.forEach((_: LocationNamesEnumEntity) => {
                    tcVM.push(new TerritoryCountViewModel(_.territoryName, _.locationCount, _.territoryName + " - " + _.locationCount));
                });
            });
            statsReturn.territoryCount = tcVM;
    
            let uccVM = new Array<UserClassCountViewModel>();
            await new UserClassContext().getUserClassCount().then((row: Array<UserClassEntity>) => {
                row.forEach((_: UserClassEntity) => {
                    uccVM.push(new UserClassCountViewModel(_.className, _.userClassCount, _.className + " - " + _.userClassCount));
                });
            });
            statsReturn.userClassCount = uccVM;
            
            return statsReturn;
        }
    }

    public async getCombatStatsByLocation(locationEnum: LocationNamesEnumViewModel): Promise<CombatStatsByLocationViewModel> {
        let combatStatsByLocationViewModel: CombatStatsByLocationViewModel = new CombatStatsByLocationViewModel();
        let calc: Calculations = new Calculations();
        await getLocations().then((res: CombatStatsViewModel) => {
            combatStatsByLocationViewModel.trashLootAmount = res.trashLootAmount;
            combatStatsByLocationViewModel.afuaruSpawns = res.afuaruSpawns;
            combatStatsByLocationViewModel.timeAmount = res.timeAmount;
        });

        await getServerCount().then((res: ServerCountViewModel) => {
            combatStatsByLocationViewModel.serverCount = res;
        });

        await getUserClassCount().then((res: UserClassCountViewModel) => {
            combatStatsByLocationViewModel.userClassCount = res;
        });

        await getHoursCount().then((res: HoursStatsViewModel) => {
            combatStatsByLocationViewModel.hoursStats = res;
        });

        if(combatStatsByLocationViewModel.timeAmount.total > 0)
            combatStatsByLocationViewModel.hasRecordAvailable = true;

        return combatStatsByLocationViewModel;

        async function getLocations(): Promise<CombatStatsViewModel> {
            let stats: CombatStatsViewModel = new CombatStatsViewModel();
            await new CombatStatsContext().getAllByLocation(calc.calcCurrentDate(), calc.calcWeekStartDate(), calc.calcMonthStartDate(), calc.calcYearStartDate(), locationEnum.locationId).then((row: Array<CombatStatsEntity>) => {
                stats.trashLootAmount.average = row[0].trashLootAmount;
                stats.trashLootAmount.daily = row[1].trashLootAmount;
                stats.trashLootAmount.weekly = row[2].trashLootAmount;
                stats.trashLootAmount.monthly = row[3].trashLootAmount;
                stats.trashLootAmount.yearly = row[4].trashLootAmount;
                stats.trashLootAmount.total = row[5].trashLootAmount;
    
                stats.afuaruSpawns.average = row[0].afuaruSpawns;
                stats.afuaruSpawns.daily = row[1].afuaruSpawns;
                stats.afuaruSpawns.weekly = row[2].afuaruSpawns;
                stats.afuaruSpawns.monthly = row[3].afuaruSpawns;
                stats.afuaruSpawns.yearly = row[4].afuaruSpawns;
                stats.afuaruSpawns.total = row[5].afuaruSpawns;
    
                stats.timeAmount.average = row[0].timeAmount;
                stats.timeAmount.daily = row[1].timeAmount;
                stats.timeAmount.weekly = row[2].timeAmount;
                stats.timeAmount.monthly = row[3].timeAmount;
                stats.timeAmount.yearly = row[4].timeAmount;
                stats.timeAmount.total = row[5].timeAmount;
            });

            return stats;
        }

        async function getServerCount(): Promise<ServerCountViewModel> {
            let scVM = new ServerCountViewModel();
            await new ServerEnumContext().getServerCountViaLocation(locationEnum.locationId).then((row: Array<ServerNamesEnumEntity>) => {
                if(row.length > 0)
                    scVM = new ServerCountViewModel(row[0].serverName, row[0].serverCount, row[0].serverName + " - " + row[0].serverCount);
            });

            return scVM;
        }

        async function getUserClassCount(): Promise<UserClassCountViewModel> {
            let uccVM = new UserClassCountViewModel();
            await new UserClassContext().getUserClassCountViaLocation(locationEnum.locationId).then((row: Array<UserClassEntity>) => {
                if(row.length > 0)
                    uccVM = new UserClassCountViewModel(row[0].className, row[0].userClassCount, row[0].className + " - " + row[0].userClassCount);
            });

            return uccVM;
        }

        async function getHoursCount(): Promise<HoursStatsViewModel> {
            let hcVM = new HoursStatsViewModel();
            await new CombatStatsHoursContext().getAllViaLocation(calc.calcCurrentDate(), calc.calcWeekStartDate(), calc.calcMonthStartDate(), calc.calcYearStartDate(), locationEnum.locationId).then((row: Array<number>) => {
                hcVM.hoursDay = row[0];
                hcVM.hoursWeek = row[1];
                hcVM.hoursMonth = row[2];
                hcVM.hoursYear = row[3];
                hcVM.hoursTotal = row[4];
            });
            return hcVM;
        }
    }
}

export class SharedCombatFunctions {
    public async getGroupedLocations(): Promise<Array<LocationNamesGroupedEnumViewModel>> {
        let locationViewModel = new Array<LocationNamesEnumViewModel>();
        await new LocationsEnumContext().getMostRecent().then((_: Array<LocationNamesEnumEntity>) => {
            if(_.length > 0) {
                _.forEach(row => {
                    locationViewModel.push(new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, parseInt(row.recommendedAP), row.afuaruSpawnable));
                });
            } 
        });

        let locationNamesEnum = new Array<LocationNamesGroupedEnumViewModel>();
        if(locationViewModel.length > 0)
            locationNamesEnum.push(new LocationNamesGroupedEnumViewModel("Recent", locationViewModel));

        let locationArray = await new LocationsEnumContext().getAll();
        await new TerritoryEnumContext().getAll().then((_: Array<TerritoryEnumEntity>) => {
            _.forEach(row => {
                let locations = new Array<LocationNamesEnumViewModel>();
                locationArray.filter((_: LocationNamesEnumEntity) => _.territoryId == row.territoryId).forEach(_ => {
                    locations.push(new LocationNamesEnumViewModel(_.locationId, _.territoryId, _.locationName, _.territoryName, _.recommendedLevel, parseInt(_.recommendedAP), _.afuaruSpawnable));
                });
                locationNamesEnum.push(new LocationNamesGroupedEnumViewModel(row.territoryName, locations));
            });
        });

        return locationNamesEnum;
    }
}