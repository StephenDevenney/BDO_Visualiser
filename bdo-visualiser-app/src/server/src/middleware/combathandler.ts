import { CombatHeadersEntity, CombatStatsEntity, GrindingDataEntity, GrindingTableHeadersEntity, LocationNamesEnumEntity, ServerNamesEnumEntity, TerritoryEnumEntity, TimeAmountEnumEntity } from '../../shared/entities/combatEntities';
import { ColumnHeadersContext, CombatSettingsContext, CombatStatsContext, CombatTableHeadersContext, GrindingDataContext, LocationsEnumContext, ServerEnumContext, TerritoryEnumContext, TimeEnumContext } from '../sqlContext/combatContext';
import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, CombatStatsViewModel, GrindingDataViewModel, LocationNamesEnumViewModel, LocationNamesGroupedEnumViewModel, PreviousCombatValuesViewModel, ServerNamesEnumViewModel, TimeAmountEnumViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { ClassNamesEnumViewModel, ClassRolesEnumViewModel, CombatTypesEnumViewModel, GearViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { ClassNamesEnumEntity, CombatTypesEnumEntity } from '../../shared/entities/userClassEntities';
import { GearContext, ClassNamesEnumContext, CombatTypesEnumContext } from '../sqlContext/userClassContext';
import { UserClassHandler } from './userClassHandler';
import { Calculations } from 'src/server/shared/calc/calculations';

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
                if(row.afuaruSpawnable)
                    afuaruSpawns = row.afuaruSpawns.toString();
                vdVM.push(new VisibleDataViewModel(row.grindingId, row.dateCreated, row.locationName, timeDescription, row.trashLootAmount, row.className, row.serverDescription, row.combatTypeName, afuaruSpawns));
                gdVM.push(new GrindingDataViewModel(row.grindingId, row.userClassId, row.dateCreated, new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, row.recommendedAP), new TimeAmountEnumViewModel(row.timeId, row.timeAmount), row.trashLootAmount, new UserClassViewModel(row.userClassId, new ClassNamesEnumViewModel(row.classNameId, row.className, row.fileName), new ClassRolesEnumViewModel(row.classRoleId, row.classRoleName), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription), new ServerNamesEnumViewModel(row.serverId, row.serverDescription, row.isElviaRealm), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), row.afuaruSpawns));
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
        return new VisibleDataViewModel(gdE.grindingId, gdE.dateCreated, gdE.locationName, gdE.timeAmount.toString() + " Minutes", gdE.trashLootAmount, gdE.className, gdE.serverDescription, gdE.combatTypeName, afuaruSpawns);

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

        let acVM = await new UserClassHandler().getUserClasses();
        let previousEntry = new PreviousCombatValuesViewModel();
        await new GrindingDataContext().getMostRecent().then((_: GrindingDataEntity) => {
            if(typeof(_) != "undefined") {
                previousEntry.combatType = new CombatTypesEnumViewModel(_.combatTypeId, _.combatTypeName);
                previousEntry.grindLocation = new LocationNamesEnumViewModel(_.locationId, _.territoryId, _.locationName, _.territoryName, _.recommendedLevel, _.recommendedAP);
                previousEntry.server = new ServerNamesEnumViewModel(_.serverId, _.serverDescription, _.isElviaRealm);
                previousEntry.timeAmount = new TimeAmountEnumViewModel(_.timeId, _.timeAmount);
                previousEntry.userClass = new UserClassViewModel(_.userClassId, new ClassNamesEnumViewModel(_.classNameId, _.className, _.fileName), new ClassRolesEnumViewModel(_.classRoleId, _.classRoleName), new CombatTypesEnumViewModel(_.combatTypeId, _.combatTypeName), new GearViewModel(_.ap, _.aap, _.dp, _.gearScore), _.classDescription);    
            }
        });

        return new CombatPageEnumsViewModel(classNamesEnum, locationNamesEnum, serverNamesEnum, combatTypesEnum, timeAmountEnum, previousEntry, acVM);
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
    public async getCombatStats(): Promise<void> {
        let calc: Calculations = new Calculations();
        let stats: CombatStatsViewModel = new CombatStatsViewModel();
        await new CombatStatsContext().getAll(calc.calcCurrentDate(), calc.calcWeekStartDate()).then((row: Array<CombatStatsEntity>) => {
            stats.trashLootAmount.average = row[0].trashLootAmount;
            stats.trashLootAmount.daily = row[1].trashLootAmount;
            stats.trashLootAmount.weekly = row[2].trashLootAmount;

            stats.afuaruSpawns.average = row[0].afuaruSpawns;
            stats.afuaruSpawns.daily = row[1].afuaruSpawns;
            stats.afuaruSpawns.weekly = row[2].afuaruSpawns;

            stats.timeAmount.average = row[0].timeAmount;
            stats.timeAmount.daily = row[1].timeAmount;
            stats.timeAmount.weekly = row[2].timeAmount;
        });

        console.log(stats);

        return;
    }
}