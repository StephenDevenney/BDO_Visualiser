import { ClassNamesEnumEntity, CombatHeadersEntity, CombatSettingsEntity, CombatTypesEnumEntity, GrindingDataEntity, GrindingTableHeadersEntity, LocationNamesEnumEntity, ServerNamesEnumEntity, TimeAmountEnumEntity, UserClassEntity } from '../../shared/entities/combatEntities';
import { ActiveClassesContext, ClassNamesEnumContext, ClassRolesEnumContext, ColumnHeadersContext, CombatSettingsContext, CombatTableHeadersContext, CombatTypesEnumContext, GrindingDataContext, LocationsEnumContext, RecentLocationsContext, ServerEnumContext, TerritoryEnumContext, TimeEnumContext } from '../sqlContext/combatContext';
import { ClassNamesEnumViewModel, CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, CombatTypesEnumViewModel, GearViewModel, GrindingDataViewModel, LocationNamesEnumViewModel, LocationNamesGroupedEnumViewModel, ServerNamesEnumViewModel, TimeAmountEnumViewModel, UserClassViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';
import { Calculations } from '../../shared/calc/calculations';

export class CombatPageDataHandler {
        // SQL Context
    private combatSettingsContext: CombatSettingsContext = new CombatSettingsContext();
    private combatTableHeadersContext: CombatTableHeadersContext = new CombatTableHeadersContext();
    private activeClassesContext: ActiveClassesContext = new ActiveClassesContext();
    private grindingDataContext: GrindingDataContext = new GrindingDataContext();
    private userClassHandler: UserClassHandler = new UserClassHandler();

    public async getCombatData(): Promise<CombatPageDataViewModel> {
        let hasDefaultCombatHeaders = (await this.combatSettingsContext.get()).hasDefaultCombatHeaders;
            // Get Table Headers
        let gthVM = new Array<CombatHeadersViewModel>();
        await this.combatTableHeadersContext.getAll().then((_ : Array<GrindingTableHeadersEntity>) => {
            _.forEach(row => {
                gthVM.push(new CombatHeadersViewModel(row.headingId,  row.field, row.header, row.isActive));
            });
        });
        //     // Get Active Classes
        // let acVM = new Array<UserClassViewModel>();
        // let hasMainClass = true;
        // await this.activeClassesContext.getAll().then((_ : Array<UserClassEntity>) => {
        //     _.forEach(async row => {
        //         acVM.push(new UserClassViewModel(row.classId,  row.className, row.classRole, row.combatTypeName, new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription));
        //     });

        //     if(acVM.length == 0 || !acVM)
        //         hasMainClass = false;
        // });
        let hasMainClass = true;
        let acVM = await this.userClassHandler.getActiveClasses();
        if(acVM.length == 0)
            hasMainClass = false
            // Get Grinding Data (Visible Data is what the user will see on screen, GrindingData is used as a data source)
        let gdVM = new Array<GrindingDataViewModel>();
        let vdVM = new Array<VisibleDataViewModel>();
        await this.grindingDataContext.getAll().then((_ : Array<GrindingDataEntity>) => {
            _.forEach(row => {
                let timeDescription = row.timeAmount + " Minutes";
                vdVM.push(new VisibleDataViewModel(row.grindingId, row.dateCreated, row.locationName, timeDescription, row.trashLootAmount, row.className, row.serverDescription, row.combatTypeName, row.afuaruSpawns));
                gdVM.push(new GrindingDataViewModel(row.grindingId, row.classId, row.dateCreated, new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, row.recommendedAP), new TimeAmountEnumViewModel(row.timeId, row.timeAmount), row.trashLootAmount, new UserClassViewModel(row.userClassId, row.className, row.classRoleName, row.combatTypeName, new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription), new ServerNamesEnumViewModel(row.serverId, row.serverDescription, row.isElviaRealm), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), row.afuaruSpawns));
            });
        });

        return new CombatPageDataViewModel(gthVM, gdVM, vdVM, hasDefaultCombatHeaders, acVM, hasMainClass);
    }

    
}

export class CombatPageEnumHandler {
        // SQL Context
    private recentLocationsContext: RecentLocationsContext = new RecentLocationsContext();
    private classNamesEnumContext: ClassNamesEnumContext = new ClassNamesEnumContext();
    private territoryEnumContext: TerritoryEnumContext = new TerritoryEnumContext();
    private locationsEnumContext: LocationsEnumContext = new LocationsEnumContext();
    private serverEnumContext: ServerEnumContext = new ServerEnumContext();
    private combatTypesEnumContext: CombatTypesEnumContext = new CombatTypesEnumContext();
    private timeEnumContext: TimeEnumContext = new TimeEnumContext();

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
            // Get Class Enums
        let classNamesEnum = new Array<ClassNamesEnumViewModel>();
        await this.classNamesEnumContext.getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                classNamesEnum.push(new ClassNamesEnumViewModel(row.classId, row.className));
            });
        });

        let locationNamesEnum = new Array<LocationNamesGroupedEnumViewModel>();
            // Get Top 3 Most Recent Location Entires First
        await this.recentLocationsContext.getAll().then((_: Array<LocationNamesEnumEntity>) => {
            if(_.length > 0) {
                _.forEach(row => {
                    let description = row.locationName;
                    if(row.recommendedAP.length > 0)
                        description += " (" + row.recommendedAP + " AP)";
                    else
                        description += " (Lv. " + row.recommendedLevel + ")";

                    locationNamesEnum.push(new LocationNamesGroupedEnumViewModel(description, new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, parseInt(row.recommendedAP))));
                });
            } 
        });

            // Get All Location Enums
        await this.locationsEnumContext.getAll().then((_: Array<LocationNamesEnumEntity>) => {
            _.forEach(row => {
                let description = row.locationName;
                let ap: number = 0;
                if(row.recommendedAP.length > 0){
                    description += " (" + row.recommendedAP + " AP)";
                    ap = parseInt(row.recommendedAP);
                }  
                else
                    description += " (Lv. " + row.recommendedLevel + ")";

                locationNamesEnum.push(new LocationNamesGroupedEnumViewModel(description, new LocationNamesEnumViewModel(row.locationId, row.territoryId, row.locationName, row.territoryName, row.recommendedLevel, ap)));
            });
        });

            // Get Server Enums
        let serverNamesEnum = new Array<ServerNamesEnumViewModel>();
        await this.serverEnumContext.getAll().then((_: Array<ServerNamesEnumEntity>) => {
            _.forEach(row => {
                serverNamesEnum.push(new ServerNamesEnumViewModel(row.serverId, row.serverName, row.isElviaRealm));
            });
        });
            // Get Combat Type Enums
        let combatTypesEnum = new Array<CombatTypesEnumViewModel>();
        await this.combatTypesEnumContext.getAll().then((_: Array<CombatTypesEnumEntity>) => {
            _.forEach(row => {
                combatTypesEnum.push(new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName));
            });
        });
            // Get Time Enums
        let timeAmountEnum = new Array<TimeAmountEnumViewModel>();
        await this.timeEnumContext.getAll().then((_: Array<TimeAmountEnumEntity>) => {
            _.forEach(row => {
                timeAmountEnum.push(new TimeAmountEnumViewModel(row.timeId, row.timeAmount));
            });
        });

        return new CombatPageEnumsViewModel(classNamesEnum, locationNamesEnum, serverNamesEnum, combatTypesEnum, timeAmountEnum);
    }

}

export class ColumnHeadersHandler {
    private columnHeadersContext: ColumnHeadersContext = new ColumnHeadersContext();

        // Get Default Column Headers
    public async getDefaultColumns(): Promise<Array<CombatHeadersViewModel>> {
        let combatHeaders = new Array<CombatHeadersEntity>();
        await this.columnHeadersContext.getAll().then((_: Array<CombatHeadersEntity>) => {
            _.forEach(row => {
                combatHeaders.push(new CombatHeadersViewModel(row.headingId, row.field, row.header, row.isActive));
            });
        });
        return combatHeaders;
    }

        // Update Single Column Header
    public async updateSingleVisibleColumn(column: CombatHeadersViewModel): Promise<void> {
        await this.columnHeadersContext.update(column.headingId, column.isActive);
        return;
    }

        // Update All Column Headers
    public async updateCombatHeaders(combatHeaders: Array<CombatHeadersViewModel>): Promise<void> {
        await Promise.all(combatHeaders.map(async (column: CombatHeadersViewModel) => {
            await this.columnHeadersContext.update(column.headingId, column.isActive);
        }));
        return;
    }
}

export class UserClassHandler {
    private activeClassesContext: ActiveClassesContext = new ActiveClassesContext();

    public async getActiveClasses(): Promise<Array<UserClassViewModel>> {
        // Get Active Classes
        let acVM = new Array<UserClassViewModel>();
        await this.activeClassesContext.getAll().then((_ : Array<UserClassEntity>) => {
            _.forEach(async row => {
                acVM.push(new UserClassViewModel(row.classId,  row.className, row.classRole, row.combatTypeName, new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription));
            });
        });
        return acVM;
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<void> {
        let ucE = await convertToEntity(userClass);
        console.log(ucE);
        // await this.activeClassesContext.insert(userClass)
        return;

        async function convertToEntity(userClass: UserClassViewModel): Promise<UserClassEntity> {
            let userClassEntity: UserClassEntity = new UserClassEntity();     
                // GET Ids
            userClassEntity.classNameId = (await new ClassNamesEnumContext().get(userClass.className)).classId;
            userClassEntity.classRoleId = (await new ClassRolesEnumContext().get(userClass.classRole)).roleId;
            userClassEntity.combatTypeId = (await new CombatTypesEnumContext().get(userClass.classRole)).combatTypeId;

                // Fill Rest
            userClassEntity.classId = userClass.classId;
            userClassEntity.className = userClass.className;
            userClassEntity.classRole = userClass.classRole;
            userClassEntity.classDescription = userClass.classDescription
            userClassEntity.combatTypeName = userClass.primaryCombatTypeDescription;
            userClassEntity.ap = userClass.gear.ap;
            userClassEntity.aap = userClass.gear.aap;
            userClassEntity.dp = userClass.gear.dp;
            userClassEntity.gearScore = new Calculations().calcGearScore(userClass.gear.ap, userClass.gear.aap, userClass.gear.dp);
            userClassEntity.dateCreated = new Calculations().calcCurrentDate();

            return userClassEntity;
        }
    }
}

export class GearHandler {

}