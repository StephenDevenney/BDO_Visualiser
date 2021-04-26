import { ClassNamesEnumViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassHandler, UserClassNameHandler } from '../middleware/userClassHandler';

export class UserClassController {
    constructor(){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await new UserClassNameHandler().getClassNames();
    } 

        // POST
    public async addMainUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        userClass.classRole = "Main";
        return await this.addUserClass(userClass);
    }

    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await new UserClassHandler().addUserClass(userClass);
    }
} 
