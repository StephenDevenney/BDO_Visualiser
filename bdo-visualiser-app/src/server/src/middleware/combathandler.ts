import { CombatSettingsEntity, GrindingDataEntity, GrindingTableHeadersEntity, UserClassEntity } from '../../shared/entities/combatEntities';
import { ActiveClassesContext, CombatSettingsContext, CombatTableHeadersContext, GrindingDataContext } from '../sqlContext/combatContext';
import { CombatPageDataViewModel, CombatPageEnumsViewModel, CombatTypesEnumViewModel, GearViewModel, GrindingDataViewModel, GrindingTableHeadersViewModel, LocationNamesEnumViewModel, ServerNamesEnumViewModel, TimeAmountEnumViewModel, UserClassViewModel, VisibleDataViewModel } from '../../shared/viewModels/combatViewModels';

export class CombatPageDataHandler {
    // SQL Context
    private combatSettingsContext: CombatSettingsContext = new CombatSettingsContext();
    private combatTableHeadersContext: CombatTableHeadersContext = new CombatTableHeadersContext();
    private activeClassesContext: ActiveClassesContext = new ActiveClassesContext();
    private grindingDataContext: GrindingDataContext = new GrindingDataContext();

    public async getCombatData(): Promise<CombatPageDataViewModel> {
        let hasDefaultCombatHeaders = (await this.combatSettingsContext.get()).hasDefaultCombatHeaders;
            // Get Table Headers
        let gthVM = new Array<GrindingTableHeadersViewModel>();
        await this.combatTableHeadersContext.getAll().then((_ : Array<GrindingTableHeadersEntity>) => {
            _.forEach(row => {
                gthVM.push(new GrindingTableHeadersViewModel(row.headingId,  row.field, row.header, row.isActive));
            });
        });
            // Get Active Classes
        let acVM = new Array<UserClassViewModel>();
        let hasMainClass = true;
        await this.activeClassesContext.getAll().then((_ : Array<UserClassEntity>) => {
            _.forEach(async row => {
                acVM.push(new UserClassViewModel(row.classId,  row.className, row.classRole, row.combatTypeName, new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription));
            });

            if(acVM.length == 0 || !acVM)
                hasMainClass = false;
        });
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

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
            // Get Combat Enums
        // let classNames
        // let locationNames
        // let serverNames
        // let combatTypes
        // let combatTypes

        return new CombatPageEnumsViewModel();
    }
}