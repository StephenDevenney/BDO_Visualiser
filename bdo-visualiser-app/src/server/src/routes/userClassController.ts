import { ClassCreationViewModel, ClassEditViewModel, ClassNamesEnumViewModel, ClassRolesEnumViewModel, CombatTypesEnumViewModel, GearViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassDataHandler, UserClassHandler } from '../middleware/userClassHandler';

export class UserClassController {
    constructor(){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await new UserClassHandler().getClassNameEnums();
    } 

    public async getClassCardsData(): Promise<Array<UserClassViewModel>> {
        return await new UserClassHandler().getUserClasses();
    } 

    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        return await new UserClassDataHandler().getClassCreationData();
    } 

    public async getClassEditData(userClassId: number): Promise<ClassEditViewModel>{
        return await new UserClassDataHandler().getClassEditData(userClassId);
    }
        // POST
    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await new UserClassDataHandler().addUserClass(userClass);
    }

    public async addCombatGearBuild(newCombatGear: GearViewModel, userClassId: number): Promise<Array<GearViewModel>> {
        return await new UserClassDataHandler().addCombatGearBuild(newCombatGear, userClassId);
    }

        // PUT
    public async updateCombatGear(combatGear: GearViewModel, userClassId: number): Promise<Array<GearViewModel>> {
        return await new UserClassDataHandler().updateCombatGear(combatGear, userClassId);
    }

    public async updateCombatType(combatType: CombatTypesEnumViewModel, userClassId: number): Promise<void> {
        return await new UserClassDataHandler().updateCombatType(combatType, userClassId);
    }

    public async updateUserClassRole(userClassRole: ClassRolesEnumViewModel, userClassId: number): Promise<void> {
        return await new UserClassDataHandler().updateUserClassRole(userClassRole, userClassId);
    }
} 
