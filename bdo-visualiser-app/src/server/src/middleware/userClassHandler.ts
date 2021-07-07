import { UserClassViewModel, CombatTypesEnumViewModel, GearViewModel, ClassNamesEnumViewModel, ClassCreationViewModel, ClassRolesEnumViewModel, GearBracketsViewModel, ClassEditViewModel, BuildsViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassContext, ClassNamesEnumContext, ClassRolesEnumContext, GearContext, CombatTypesEnumContext } from '../sqlContext/userClassContext';
import { Calculations } from '../../shared/calc/calculations';
import { ClassNamesEnumEntity, ClassRoleEnumEntity, CombatTypesEnumEntity, GearEntity, UserClassEntity } from '../../shared/entities/userClassEntities';

export class UserClassDataHandler {
    public async getClassCardsData(): Promise<Array<UserClassViewModel>> {
        let uc = await new UserClassHandler().getUserClasses();
        return await new UserClassHandler().getPrimaryCombatGearBuildForAllClasses(uc);
    }

    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await new UserClassHandler().getClassNameEnums();
    }

    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        let hasMainUserClass = true;
        let cneVM = new Array<ClassNamesEnumViewModel>();
        let cteVM = new Array<CombatTypesEnumViewModel>();
        let creVM = new Array<ClassRolesEnumViewModel>();
        await this.getClassNameEnums().then((res: Array<ClassNamesEnumViewModel>) => { cneVM = res; });
        await new UserClassHandler().getCombatTypeEnums().then((res: Array<CombatTypesEnumViewModel>) => { cteVM = res; });
        await new UserClassHandler().getClassRoleEnums().then((res: Array<ClassRolesEnumViewModel>) => { creVM = res; });
        await new UserClassHandler().getMostRecentUserClass().then((_: UserClassViewModel) => {
            if(_.classId == 0)
                hasMainUserClass = false;
        });

        return new ClassCreationViewModel(cneVM, cteVM, creVM, new UserClassViewModel(), hasMainUserClass);
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        let ucE = await new UserClassHandler().convertUserClassViewModelToEntity(userClass);
        await new UserClassContext().insert(ucE);
        let ncE = await new UserClassContext().getMostRecent();
        await this.updateUserClassActiveGearScoreId(ucE.FK_gearScoreId, ncE.classId);
        let gE = await new GearContext().updateClassId(ncE.FK_gearScoreId, ncE.classId);

        return new UserClassViewModel(
            ncE.classId, 
            new ClassNamesEnumViewModel(ncE.classNameId, ncE.className, ncE.fileName), 
            new ClassRolesEnumViewModel(ncE.classRoleId, ncE.classRole), 
            new CombatTypesEnumViewModel(ncE.combatTypeId, ncE.combatTypeName), 
            new GearViewModel(gE.gearScoreId, gE.gearScoreBuildId, gE.gearLabel, gE.ap, gE.aap, gE.dp, gE.gearScore, 
                            new GearBracketsViewModel(gE.apBracketLow + " - " + gE.apBracketHigh, gE.apBracketBonus, gE.aapBracketLow + " - " + gE.aapBracketHigh, gE.aapBracketBonus, gE.dpBracketLow + " - " + gE.dpBracketHigh, gE.dpBracketBonus + "%"), 
                            new GearBracketsViewModel(gE.nextAapBracketLow + " - " + gE.nextApBracketHigh, gE.nextApBracketBonus, gE.nextAapBracketLow + " - " + gE.nextAapBracketHigh, gE.nextAapBracketBonus, gE.nextDpBracketLow + " - " + gE.nextDpBracketHigh, gE.nextDpBracketBonus + "%")), 
            ncE.classDescription
        );
    }

    public async getClassEditData(userClassId: number): Promise<ClassEditViewModel> {
        let ceVM: ClassEditViewModel = new ClassEditViewModel();
        await new UserClassHandler().getGearBuilds(userClassId).then((res: BuildsViewModel) => { ceVM.builds = res; });
        await new UserClassHandler().getCombatTypeByUserClassId(userClassId).then((res: CombatTypesEnumViewModel) => { ceVM.userClassCombatType = res; });
        await new UserClassHandler().getRoleByUserClassId(userClassId).then((res: ClassRolesEnumViewModel) => { ceVM.userClassRole = res; });
        await new UserClassHandler().getCombatTypeEnums().then((res: Array<CombatTypesEnumViewModel>) => { ceVM.userClassCombatTypesEnum = res; });
        await new UserClassHandler().getClassRoleEnums().then((res: Array<ClassRolesEnumViewModel>) => { ceVM.userClassRolesEnum = res; });

        return ceVM;
    }

    public async addCombatGearBuild(newCombatGear: GearViewModel, userClassId: number): Promise<Array<GearViewModel>> {
        await new UserClassHandler().getGearScoreBuildId(newCombatGear, userClassId).then((res: number) => { newCombatGear.gearScoreBuildId = res; });
        await new UserClassHandler().createCombatGearEntry(newCombatGear, userClassId);
        return await new UserClassHandler().getCombatBuilds(userClassId);
    }

    public async updateCombatGear(combatGear: GearViewModel, userClassId: number): Promise<Array<GearViewModel>> {
       await new UserClassHandler().updateCombatGearCurrentState(userClassId, combatGear.gearScoreBuildId);
       let gVM = await this.addCombatGearBuild(combatGear, userClassId);
       if(combatGear.isActive) {
        await this.updateUserClassActiveGearScoreId(gVM.filter((e: GearViewModel) => e.gearLabel == combatGear.gearLabel)[0].gearScoreId, userClassId);
        gVM.filter((e: GearViewModel) => e.gearLabel == combatGear.gearLabel)[0].isActive = true;
       }

       return gVM;
    }

    public async updateCombatType(combatType: CombatTypesEnumViewModel, userClassId: number): Promise<void> {
        return await new CombatTypesEnumContext().updateCombatType(combatType, userClassId);
    }

    public async updateUserClassRole(userClassRole: ClassRolesEnumViewModel, userClassId: number): Promise<void> {
        return await new ClassRolesEnumContext().updateUserClassRole(userClassRole, userClassId);
    }

    public async updateUserClassActiveGearScoreId(gearScoreId: number, userClassId: number): Promise<void> {
        return await new UserClassContext().updateCombatGearActiveState(gearScoreId, userClassId);
    }
}

export class UserClassHandler {
    public async getUserClasses(): Promise<Array<UserClassViewModel>> {
        let acVM = new Array<UserClassViewModel>();
        await new UserClassContext().getAll().then(async (_ : Array<UserClassEntity>) => {
            await Promise.all(_.map(async (row) => { 
                acVM.push(new UserClassViewModel(
                    row.classId, 
                    new ClassNamesEnumViewModel(row.classNameId, row.className, row.fileName),
                    new ClassRolesEnumViewModel(row.classRoleId, row.classRole),
                    new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName),
                    new GearViewModel(),
                    row.classDescription
                ));
            }));
        });
        return acVM;
    }

    public async getPrimaryCombatGearBuildForAllClasses(userClasses: Array<UserClassViewModel>): Promise<Array<UserClassViewModel>> {
        await Promise.all(userClasses.map(async (row) => { 
            await new GearContext().getViaClassId(row.classId).then(async (res: GearEntity) => {
                row.gear = new GearViewModel(res.gearScoreId, res.gearScoreBuildId, res.gearLabel, res.ap, res.aap, res.dp, res.gearScore, 
                new GearBracketsViewModel(res.apBracketLow + " - " + res.apBracketHigh, res.apBracketBonus, res.aapBracketLow + " - " + res.aapBracketHigh, res.aapBracketBonus, res.dpBracketLow + " - " + res.dpBracketHigh, res.dpBracketBonus + "%"), 
                new GearBracketsViewModel(res.nextAapBracketLow + " - " + res.nextApBracketHigh, res.nextApBracketBonus, res.nextAapBracketLow + " - " + res.nextAapBracketHigh, res.nextAapBracketBonus, res.nextDpBracketLow + " - " + res.nextDpBracketHigh, res.nextDpBracketBonus + "%"), 
                res.isActive)
            });
        }));

        return userClasses;
    }

    public async getCombatTypeEnums(): Promise<Array<CombatTypesEnumViewModel>> {
        let combatTypesEnum = new Array<CombatTypesEnumViewModel>();
        await new CombatTypesEnumContext().getAll().then((_: Array<CombatTypesEnumEntity>) => {
            _.forEach(row => {
                combatTypesEnum.push(new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName));
            });
        });

        return combatTypesEnum;
    }

    public async getClassRoleEnums(): Promise<Array<ClassRolesEnumViewModel>> {
        let classRoleEnums = new Array<ClassRolesEnumViewModel>();
        await new ClassRolesEnumContext().getAll().then((_: Array<ClassRoleEnumEntity>) => {
            _.forEach(row => {
                classRoleEnums.push(new ClassRolesEnumViewModel(row.roleId, row.roleDescription));
            });
        });

        return classRoleEnums;
    }

    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        let classNamesEnum = new Array<ClassNamesEnumViewModel>();
        await new ClassNamesEnumContext().getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                classNamesEnum.push(new ClassNamesEnumViewModel(row.classId, row.className, row.fileName, false));
            });
        });
        return classNamesEnum;
    }

    public async getMostRecentUserClass(): Promise<UserClassViewModel> {
        let userClass: UserClassViewModel = new UserClassViewModel();
        await new UserClassContext().getMostRecent().then(async (row: UserClassEntity) => {
            if(typeof(row) != "undefined") {
                await new GearContext().getViaClassId(row.classId).then((res: GearEntity) => {
                    userClass = new UserClassViewModel(
                        row.classId, 
                        new ClassNamesEnumViewModel(row.classNameId, row.className, row.fileName), 
                        new ClassRolesEnumViewModel(row.classRoleId, row.classRole), 
                        new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), 
                        new GearViewModel(res.gearScoreId, res.gearScoreBuildId, res.gearLabel, res.ap, res.aap, res.dp, res.gearScore, 
                                        new GearBracketsViewModel(res.apBracketLow + " - " + res.apBracketHigh, res.apBracketBonus, res.aapBracketLow + " - " + res.aapBracketHigh, res.aapBracketBonus, res.dpBracketLow + " - " + res.dpBracketHigh, res.dpBracketBonus + "%"), 
                                        new GearBracketsViewModel(res.nextAapBracketLow + " - " + res.nextApBracketHigh, res.nextApBracketBonus, res.nextAapBracketLow + " - " + res.nextAapBracketHigh, res.nextAapBracketBonus, res.nextDpBracketLow + " - " + res.nextDpBracketHigh, res.nextDpBracketBonus + "%"), res.isActive), 
                        row.classDescription
                    );
                });
            }
            else {
                return userClass;
            }  
        }); 

        return userClass;
    }

    public async getCombatBuilds(userClassId: number): Promise<Array<GearViewModel>> {
        let gVM: Array<GearViewModel> = new Array<GearViewModel>();
        await new GearContext().getAllUserClassBuilds(userClassId).then((res: Array<GearEntity>) => {
            res.forEach((_: GearEntity) => {
                gVM.push(new GearViewModel(_.gearScoreId, _.gearScoreBuildId, _.gearLabel, _.ap, _.aap, _.dp, _.gearScore, 
                    new GearBracketsViewModel(_.aapBracketLow + " - " + _.apBracketHigh, _.apBracketBonus, _.aapBracketLow + " - " + _.aapBracketHigh, _.aapBracketBonus, _.dpBracketLow + " - " + _.dpBracketHigh, _.dpBracketBonus + "%"), 
                    new GearBracketsViewModel(_.nextAapBracketLow + " - " + _.nextApBracketHigh, _.nextApBracketBonus, _.nextAapBracketLow + " - " + _.nextAapBracketHigh, _.nextAapBracketBonus, _.nextDpBracketLow + " - " + _.nextDpBracketHigh, _.nextDpBracketBonus + "%"), 
                    _.isActive)
                );
            });
        });
        return gVM;
    }

    public async getLifeBuilds(): Promise<void> {
        /*
            Get Life Gear Here
        */
        return;
    }

    public async getGearBuilds(userClassId: number): Promise<BuildsViewModel> {
        let builds: BuildsViewModel = new BuildsViewModel();
        await this.getCombatBuilds(userClassId).then((res: Array<GearViewModel>) => { builds.combat = res; });
        await this.getLifeBuilds().then((res: void) => { });

        return builds;
    }

    public async getRoleByUserClassId(classId: number): Promise<ClassRolesEnumViewModel> {
        let userClassRole: ClassRolesEnumViewModel = new ClassRolesEnumViewModel();
        await new ClassRolesEnumContext().getViaUserClassId(classId).then((res: ClassRoleEnumEntity) => {
            userClassRole.classRoleId = res.roleId;
            userClassRole.classRole = res.roleDescription;
        });

        return userClassRole;
    }

    public async getCombatTypeByUserClassId(classId: number): Promise<CombatTypesEnumViewModel> {
        let combatType: CombatTypesEnumViewModel = new CombatTypesEnumViewModel();
        await new CombatTypesEnumContext().getViaUserClassId(classId).then((res: CombatTypesEnumViewModel) => {
            combatType.combatTypeId = res.combatTypeId;
            combatType.combatTypeName = res.combatTypeName;
        });
        
        return combatType;
    }

    public async updateCombatGearCurrentState(userClassId: number, gearScoreBuildId: number): Promise<void> {
        return await new GearContext().updateCombatGearCurrentState(userClassId, gearScoreBuildId);
    }

    public async createCombatGearEntry(combatGear: GearViewModel, userClassId: number): Promise<GearEntity> {
        return await new GearContext().insertWithUserClassId(combatGear, userClassId);
    }

    public async convertGearEntityToViewModel(combatGearEntity: GearEntity): Promise<GearViewModel> {
        return new GearViewModel(combatGearEntity.gearScoreId, combatGearEntity.gearScoreBuildId, combatGearEntity.gearLabel, combatGearEntity.ap, combatGearEntity.aap, combatGearEntity.dp, combatGearEntity.gearScore, new GearBracketsViewModel(combatGearEntity.aapBracketLow + " - " + combatGearEntity.apBracketHigh, combatGearEntity.apBracketBonus, combatGearEntity.aapBracketLow + " - " + combatGearEntity.aapBracketHigh, combatGearEntity.aapBracketBonus, combatGearEntity.dpBracketLow + " - " + combatGearEntity.dpBracketHigh, combatGearEntity.dpBracketBonus + "%"), new GearBracketsViewModel(combatGearEntity.nextAapBracketLow + " - " + combatGearEntity.nextApBracketHigh, combatGearEntity.nextApBracketBonus, combatGearEntity.nextAapBracketLow + " - " + combatGearEntity.nextAapBracketHigh, combatGearEntity.nextAapBracketBonus, combatGearEntity.nextDpBracketLow + " - " + combatGearEntity.nextDpBracketHigh, combatGearEntity.nextDpBracketBonus + "%"), combatGearEntity.isActive);
    }

    /* 
        - Only used when creating userclass;
    */
    public async convertUserClassViewModelToEntity(userClass: UserClassViewModel): Promise<UserClassEntity> {
        let userClassEntity: UserClassEntity = new UserClassEntity(); 
        userClassEntity.classNameId = (await new ClassNamesEnumContext().get(userClass.classNameEnum.className)).classId;
        if(userClass.classRoleEnum.classRoleId != 4) {
            userClass.gear.gearScoreBuildId = 1;
            let ngE = await new GearContext().insert(userClass.gear);
            userClassEntity.FK_gearScoreId = ngE.gearScoreId;
            userClassEntity.combatTypeId = userClass.combatTypeEnum.combatTypeId;
            userClassEntity.combatTypeName = userClass.combatTypeEnum.combatTypeName;
        }
        userClassEntity.className = userClass.classNameEnum.className;
        userClassEntity.classRole = userClass.classRoleEnum.classRole;
        userClassEntity.classRoleId = userClass.classRoleEnum.classRoleId
        userClassEntity.classDescription = userClass.classDescription;
        userClassEntity.dateCreated = new Calculations().calcCurrentDate();

        return userClassEntity;
    }

    public async getGearScoreBuildId(combatGear: GearViewModel, userClassId: number) : Promise<number> {
        let gearBuildId: number = 0;
        await new GearContext().getExistingBuildId(combatGear, userClassId).then((res: number) => { 
            if(typeof(res) != "undefined")
                gearBuildId = res; 
        });

        if(gearBuildId === 0)
            await new GearContext().getNextAvailableBuildId(userClassId).then((res: number) => { gearBuildId = res; });

        return gearBuildId;
    }
}