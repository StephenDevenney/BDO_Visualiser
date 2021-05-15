import { CharacterCardsViewModel, ClassCreationViewModel, ClassEditViewModel, ClassNamesEnumViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassCreationHandler, UserClassHandler, UserClassNameHandler } from '../middleware/userClassHandler';

export class UserClassController {
    constructor(){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await new UserClassNameHandler().getClassNames();
    } 

    public async getClassCardsData(): Promise<Array<UserClassViewModel>> {
        return await new UserClassHandler().getUserClasses();
    } 

    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        return await new UserClassCreationHandler().getClassCreationData();
    } 

    public async getClassEditData(): Promise<ClassEditViewModel>{
        return new ClassEditViewModel();
    }
        // POST
    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await new UserClassHandler().addUserClass(userClass);
    }
} 
