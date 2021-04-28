import { UserClassViewModel, CombatTypesEnumViewModel, GearViewModel, ClassNamesEnumViewModel, ClassCreationViewModel, ClassRolesEnumViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassContext, ClassNamesEnumContext, ClassRolesEnumContext, GearContext, CombatTypesEnumContext } from '../sqlContext/userClassContext';
import { Calculations } from '../../shared/calc/calculations';
import { ClassNamesEnumEntity, ClassRoleEnumEntity, CombatTypesEnumEntity, UserClassEntity } from '../../shared/entities/userClassEntities';


export class UserClassHandler {
    public async getUserClasses(): Promise<Array<UserClassViewModel>> {
        let acVM = new Array<UserClassViewModel>();
        await new UserClassContext().getAll().then((_ : Array<UserClassEntity>) => {
            _.forEach(async row => {
                acVM.push(new UserClassViewModel(row.classId,  row.className, new ClassRolesEnumViewModel(row.classRoleId, row.classRole), new CombatTypesEnumViewModel(row.combatTypeId, row.combatTypeName), new GearViewModel(row.ap, row.aap, row.dp, row.gearScore), row.classDescription));
            });
        });
        return acVM;
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        let ucE = await convertToEntity(userClass);
        await new UserClassContext().insert(ucE);
        let ncE = await new UserClassContext().getMostRecent();
        await new GearContext().updateClassId(ncE.FK_gearScoreId, ncE.classId );

        return new UserClassViewModel(ncE.classId, ncE.className, new ClassRolesEnumViewModel(ncE.classRoleId, ncE.classRole), new CombatTypesEnumViewModel(ncE.combatTypeId, ncE.combatTypeName), new GearViewModel(ncE.ap, ncE.aap, ncE.dp, ncE.gearScore), ncE.classDescription);

        async function convertToEntity(userClass: UserClassViewModel): Promise<UserClassEntity> {
            let userClassEntity: UserClassEntity = new UserClassEntity(); 
            userClassEntity.classNameId = (await new ClassNamesEnumContext().get(userClass.className)).classId;
            await new GearContext().insert(userClass.gear);
            let gE = (await new GearContext().getMostRecent());       
            userClassEntity.FK_gearScoreId = gE.gearScoreId;
            userClassEntity.gearScore = gE.gearScore;
            userClassEntity.className = userClass.className;
            userClassEntity.classRole = userClass.classRole.classRole;
            userClassEntity.classRoleId = userClass.classRole.classRoleId
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
                cneVM.push(new ClassNamesEnumViewModel(row.classId, row.className, false));
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
        await new UserClassContext().getMostRecent().then(_ => {
            if(typeof(_) == "undefined")
                hasMainUserClass = false;
        }); 

        return new ClassCreationViewModel(cneVM, cteVM, creVM, new UserClassViewModel(), hasMainUserClass);
    }
}