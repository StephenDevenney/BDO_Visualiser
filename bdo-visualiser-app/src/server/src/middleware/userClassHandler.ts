import { UserClassViewModel, CombatTypesEnumViewModel, GearViewModel, ClassNamesEnumViewModel, ClassCreationViewModel, ClassRolesEnumViewModel, GearBracketsViewModel, CharacterCardsViewModel, ClassEditViewModel, BuildsViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassContext, ClassNamesEnumContext, ClassRolesEnumContext, GearContext, CombatTypesEnumContext, GearBracketContext } from '../sqlContext/userClassContext';
import { Calculations } from '../../shared/calc/calculations';
import { ClassNamesEnumEntity, ClassRoleEnumEntity, CombatTypesEnumEntity, GearBracketsEntity, GearEntity, UserClassEntity } from '../../shared/entities/userClassEntities';


export class UserClassHandler {
    public async getUserClasses(): Promise<Array<UserClassViewModel>> {
        let acVM = new Array<UserClassViewModel>();
        await new UserClassContext().getAll().then((_ : Array<UserClassEntity>) => {
            _.forEach(async row => {
                if(row.FK_gearTypeId == 1) {
                    await new GearContext().getViaClassId(row.classId).then((res: GearEntity) => {
                        acVM.push(new UserClassViewModel(row.classId, new ClassNamesEnumViewModel(row.classNameId, row.className, row.fileName), new ClassRolesEnumViewModel(row.classRoleId, row.classRole), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new GearViewModel(res.gearLabel, res.ap, res.aap, res.dp, res.gearScore, new GearBracketsViewModel(res.apBracketLow + " - " + res.apBracketHigh, res.apBracketBonus, res.aapBracketLow + " - " + res.aapBracketHigh, res.aapBracketBonus, res.dpBracketLow + " - " + res.dpBracketHigh, res.dpBracketBonus + "%")), row.classDescription));
                    });
                }  
                /*
                    TODO: else if(row.FK_gearTypeId == 2) get life gear
                */
            });
        });
        return acVM;
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        let ucE = await convertToEntity(userClass);
        await new UserClassContext().insert(ucE);
        let ncE = await new UserClassContext().getMostRecent();
        let gE = await new GearContext().updateClassId(ncE.FK_gearScoreId, ncE.classId);

        return new UserClassViewModel(ncE.classId, new ClassNamesEnumViewModel(ncE.classNameId, ncE.className, ncE.fileName), new ClassRolesEnumViewModel(ncE.classRoleId, ncE.classRole), new CombatTypesEnumViewModel(ncE.combatTypeId, ncE.combatTypeName), new GearViewModel(gE.gearLabel, gE.ap, gE.aap, gE.dp, gE.gearScore, new GearBracketsViewModel(gE.apBracketLow + " - " + gE.apBracketHigh, gE.apBracketBonus, gE.aapBracketLow + " - " + gE.aapBracketHigh, gE.aapBracketBonus, gE.dpBracketLow + " - " + gE.dpBracketHigh, gE.dpBracketBonus + "%")), ncE.classDescription);

        async function convertToEntity(userClass: UserClassViewModel): Promise<UserClassEntity> {
            let userClassEntity: UserClassEntity = new UserClassEntity(); 
            userClassEntity.classNameId = (await new ClassNamesEnumContext().get(userClass.classNameEnum.className)).classId;
            if(userClass.classRoleEnum.classRoleId != 4) {
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
    }
}

export class UserClassNameHandler {
    public async getClassNames(): Promise<Array<ClassNamesEnumViewModel>> {
        let classNamesEnum = new Array<ClassNamesEnumViewModel>();
        await new ClassNamesEnumContext().getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                classNamesEnum.push(new ClassNamesEnumViewModel(row.classId, row.className));
            });
        });
        return classNamesEnum;
    }
}

export class UserClassCreationHandler {
    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        
        let cneVM = new Array<ClassNamesEnumViewModel>();
        await new ClassNamesEnumContext().getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                cneVM.push(new ClassNamesEnumViewModel(row.classId, row.className, row.fileName, false));
            });
        });

        let cteVM = new Array<CombatTypesEnumViewModel>();
        await new CombatTypesEnumContext().getAll().then((_: Array<CombatTypesEnumEntity>) => {
            _.forEach(row => {
                cteVM.push(new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName));
            });
        });

        let creVM = new Array<ClassRolesEnumViewModel>();
        await new ClassRolesEnumContext().getAll().then((_: Array<ClassRoleEnumEntity>) => {
            _.forEach(row => {
                creVM.push(new ClassRolesEnumViewModel(row.roleId, row.roleDescription));
            });
        });
        let hasMainUserClass = true;
        await new UserClassContext().getMostRecent().then((_: UserClassEntity) => {
            if(typeof(_) == "undefined")
                hasMainUserClass = false;
        }); 

        return new ClassCreationViewModel(cneVM, cteVM, creVM, new UserClassViewModel(), hasMainUserClass);
    }
}

export class UserClassEditHandler {
    public async getClassEditData(): Promise<ClassEditViewModel> {
        let ceVM: ClassEditViewModel = new ClassEditViewModel();
        await getGearBuilds().then((res: BuildsViewModel) => {
            ceVM.builds = res;
        });

        return new ClassEditViewModel();

        async function getGearBuilds(): Promise<BuildsViewModel> {
            let builds: BuildsViewModel = new BuildsViewModel();
            await getCombatBuilds().then((res: Array<GearViewModel>) => {
                builds.combat = res;
            });
            await getLifeBuilds().then((res: void) => {

            });
            return builds;
        }

        async function getCombatBuilds(): Promise<Array<GearViewModel>> {
            let gVM: Array<GearViewModel> = new Array<GearViewModel>();
            await new GearContext().getAll().then((res: Array<GearEntity>) => {
                res.forEach((_: GearEntity) => {
                    gVM.push(new GearViewModel(_.gearLabel, _.ap, _.aap, _.dp, _.gearScore));
                });
            });
            return new Array<GearViewModel>();
        }

        async function getLifeBuilds(): Promise<void> {
            /*
                Get Life Gear Here
            */
            return;
        }
    }
}