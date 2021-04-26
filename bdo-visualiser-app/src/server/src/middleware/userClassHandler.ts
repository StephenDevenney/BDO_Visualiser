import { UserClassViewModel, CombatTypesEnumViewModel, GearViewModel, ClassNamesEnumViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassContext, ClassNamesEnumContext, ClassRolesEnumContext, GearContext } from '../sqlContext/userClassContext';
import { Calculations } from '../../shared/calc/calculations';
import { ClassNamesEnumEntity, UserClassEntity } from '../../shared/entities/userClassEntities';


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
            let userClassEntity: UserClassEntity = new UserClassEntity(); 
            userClassEntity.classNameId = (await new ClassNamesEnumContext().get(userClass.className)).classId;
            userClassEntity.classRoleId = (await new ClassRolesEnumContext().get(userClass.classRole)).roleId;
            await new GearContext().insert(userClass.gear);
            let gE = (await new GearContext().getMostRecent());
            
            userClassEntity.FK_gearScoreId = gE.gearScoreId;
            userClassEntity.gearScore = gE.gearScore;

            
                // Fill The Rest
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

export class UserClassNameHandler {
    public async getClassNames(): Promise<Array<ClassNamesEnumViewModel>> {
        // Get Active Classes
        let classNamesEnum = new Array<ClassNamesEnumViewModel>();
        await new ClassNamesEnumContext().getAll().then((_: Array<ClassNamesEnumEntity>) => {
            _.forEach(row => {
                classNamesEnum.push(new ClassNamesEnumViewModel(row.classId, row.className));
            });
        });
        return classNamesEnum;
    }
}