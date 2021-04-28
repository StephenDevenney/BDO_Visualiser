import { ClassCreationViewModel, ClassNamesEnumViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassCreationHandler, UserClassHandler, UserClassNameHandler } from '../middleware/userClassHandler';

export class UserClassController {
    constructor(){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await new UserClassNameHandler().getClassNames();
    } 

        // POST
    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await new UserClassHandler().addUserClass(userClass);
    }

        // GET
    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        return await new UserClassCreationHandler().getClassCreationData();
    } 
} 
