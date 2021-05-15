import { ClassCreationViewModel, ClassEditViewModel, ClassNamesEnumViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
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
} 
