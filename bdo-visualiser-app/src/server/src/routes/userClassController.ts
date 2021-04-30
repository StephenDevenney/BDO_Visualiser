import { CharacterCardsViewModel, ClassCreationViewModel, ClassNamesEnumViewModel, UserClassViewModel } from '../../shared/viewModels/userClassViewModel';
import { UserClassCardsHandler, UserClassCreationHandler, UserClassHandler, UserClassNameHandler } from '../middleware/userClassHandler';

export class UserClassController {
    constructor(){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await new UserClassNameHandler().getClassNames();
    } 

    public async getClassCardsData(): Promise<CharacterCardsViewModel> {
        return await new UserClassCardsHandler().getClassCardsData();
    } 

    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        return await new UserClassCreationHandler().getClassCreationData();
    } 
        // POST
    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await new UserClassHandler().addUserClass(userClass);
    }
} 
