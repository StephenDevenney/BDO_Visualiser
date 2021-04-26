import { CombatHeadersEntity, GrindingDataEntity, GrindingTableHeadersEntity, LocationNamesEnumEntity, ServerNamesEnumEntity, TerritoryEnumEntity, TimeAmountEnumEntity } from '../../shared/entities/combatEntities';
import { ColumnHeadersContext, CombatSettingsContext, CombatTableHeadersContext, GrindingDataContext, LocationsEnumContext, RecentLocationsContext, ServerEnumContext, TerritoryEnumContext, TimeEnumContext } from '../sqlContext/combatContext';
import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, GrindingDataViewModel, LocationNamesEnumViewModel, LocationNamesGroupedEnumViewModel, PreviousCombatValuesViewModel, ServerNamesEnumViewModel, TimeAmountEnumViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { Calculations } from '../../shared/calc/calculations';
import { ClassNamesEnumViewModel, CombatTypesEnumViewModel, GearViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { ClassNamesEnumEntity, CombatTypesEnumEntity, UserClassEntity } from '../../shared/entities/userClassEntities';
import { GearContext, ClassNamesEnumContext, CombatTypesEnumContext, UserClassContext, ClassRolesEnumContext } from '../sqlContext/userClassContext';

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
                vdVM.push(new VisibleDataViewModel(row.grindingId, row.dateCreated, row.locationName, timeDescription, row.trashLootAmount, row.className, row.serverDescription, row.combatTypeName, row.afuaruSpawns));
                gdVM.push(new GrindingDataViewModel(row.grindingId, row.userClassId, row.dateCreated, new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, row.recommendedAP), new TimeAmountEnumViewModel(row.timeId, row.timeAmount), row.trashLootAmount, new UserClassViewModel(row.userClassId, row.className, row.classRoleName, new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription), new ServerNamesEnumViewModel(row.serverId, row.serverDescription, row.isElviaRealm), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), row.afuaruSpawns));
            });
        });

        return new CombatPageDataViewModel(gthVM, gdVM, vdVM, hasDefaultCombatHeaders, acVM, hasMainClass);
    }

    public async addEntry(entry: GrindingDataViewModel, combatHeaders: Array<CombatHeadersViewModel>): Promise<VisibleDataViewModel> {
        let eE = await convertToEntity(entry, combatHeaders);
        await new GrindingDataContext().insert(eE);
        let gdE = await new GrindingDataContext().getMostRecent();
        return new VisibleDataViewModel(gdE.grindingId, gdE.dateCreated, gdE.locationName, gdE.timeAmount.toString() + " Minutes", gdE.trashLootAmount, gdE.className, gdE.serverDescription, gdE.combatTypeName, gdE.afuaruSpawns);

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
                res.combatTypeId = eVM.userClass.combatTypeDescription.combatTypeId;
            res.gearScoreId = (await new GearContext().getViaClassId(eVM.userClass.classId)).gearScoreId;
            res.trashLootAmount = eVM.trashLootAmount;
            res.afuaruSpawns = eVM.afuaruSpawns;

            return res;
        }
    }
}

export class CombatPageEnumHandler {
    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        let classNamesEnum = new Array<ClassNamesEnumViewModel>();
        await new ClassNamesEnumContext().getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                classNamesEnum.push(new ClassNamesEnumViewModel(row.classId, row.className));
            });
        });
        
        let locationViewModel = new Array<LocationNamesEnumViewModel>();
        await new RecentLocationsContext().getAll().then((_: Array<LocationNamesEnumEntity>) => {
            if(_.length > 0) {
                _.forEach(row => {
                    locationViewModel.push(new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, parseInt(row.recommendedAP)));
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
                    locations.push(new LocationNamesEnumViewModel(_.locationId, _.territoryId, _.locationName, _.territoryName, _.recommendedLevel, parseInt(_.recommendedAP)));
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
        await new CombatTypesEnumContext().getAll().then((_: Array<CombatTypesEnumEntity>) => {
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
        
        let previousEntry = new PreviousCombatValuesViewModel();
        await new GrindingDataContext().getMostRecent().then((_: GrindingDataEntity) => {
            if(typeof(_) != "undefined") {
                previousEntry.combatType = new CombatTypesEnumViewModel(_.combatTypeId, _.combatTypeName);
                previousEntry.grindLocation = new LocationNamesEnumViewModel(_.locationId, _.territoryId, _.locationName, _.territoryName, _.recommendedLevel, _.recommendedAP);
                previousEntry.server = new ServerNamesEnumViewModel(_.serverId, _.serverDescription, _.isElviaRealm);
                previousEntry.timeAmount = new TimeAmountEnumViewModel(_.timeId, _.timeAmount);
                previousEntry.userClass = new UserClassViewModel(_.userClassId, _.className, _.classRoleName, new CombatTypesEnumViewModel(_.combatTypeId, _.combatTypeName), new GearViewModel(_.ap, _.aap, _.dp, _.gearScore), _.classDescription);    
            }
        });    
        return new CombatPageEnumsViewModel(classNamesEnum, locationNamesEnum, serverNamesEnum, combatTypesEnum, timeAmountEnum, previousEntry);
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

    public async updateCombatHeaders(combatHeaders: Array<CombatHeadersViewModel>): Promise<Array<CombatHeadersViewModel>> {
        await Promise.all(combatHeaders.map(async (column: CombatHeadersViewModel) => {
            await new ColumnHeadersContext().update(column.headingId, column.isActive);
        }));
        await new ColumnHeadersContext().updateHasColumnsSet();

        return await this.getDefaultColumns();
        
    }
}

export class UserClassHandler {
    public async getUserClasses(): Promise<Array<UserClassViewModel>> {
        let acVM = new Array<UserClassViewModel>();
        await new UserClassContext().getAll().then((_ : Array<UserClassEntity>) => {
            _.forEach(async row => {
                acVM.push(new UserClassViewModel(row.classId,  row.className, row.classRole, new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription));
            });
        });
        return acVM;
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        let ucE = await convertToEntity(userClass);
        await new UserClassContext().insert(ucE);
        let ncE = await new UserClassContext().getMostRecent();
        await new GearContext().updateClassId(ncE.FK_gearScoreId, ncE.classId );

        return new UserClassViewModel(ncE.classId, ncE.className, ncE.classRole, new CombatTypesEnumViewModel(ncE.combatTypeId, ncE.combatTypeName), new GearViewModel(ncE.ap, ncE.aap, ncE.dp, ncE.gearScore), ncE.classDescription);

        async function convertToEntity(userClass: UserClassViewModel): Promise<UserClassEntity> {
            /*
                Get unavailble ids before continuing with filling the rest.
            */
            let userClassEntity: UserClassEntity = new UserClassEntity();     
            userClassEntity.classNameId = (await new ClassNamesEnumContext().get(userClass.className)).classId;
            userClassEntity.classRoleId = (await new ClassRolesEnumContext().get(userClass.classRole)).roleId;
            await new GearContext().insert(userClass.gear);
            let gE = (await new GearContext().getMostRecent());
            userClassEntity.FK_gearScoreId = gE.gearScoreId;
            userClassEntity.gearScore = gE.gearScore;

            userClassEntity.className = userClass.className;
            userClassEntity.classRole = userClass.classRole;
            userClassEntity.classDescription = userClass.classDescription;
            userClassEntity.combatTypeId = userClass.combatTypeDescription.combatTypeId;
            userClassEntity.combatTypeName = userClass.combatTypeDescription.combatTypeName;
            userClassEntity.ap = userClass.gear.ap;
            userClassEntity.aap = userClass.gear.aap;
            userClassEntity.dp = userClass.gear.dp;
            userClassEntity.dateCreated = new Calculations().calcCurrentDate();

            return userClassEntity;
        }
    }
}