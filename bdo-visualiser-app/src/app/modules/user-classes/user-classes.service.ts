import { Injectable } from '@angular/core';
import { CharacterCardsViewModel, ClassCreationViewModel, ClassNamesEnumViewModel, UserClassViewModel } from '../../../server/shared/viewModels/userClassViewModel';
import { UserClassController } from '../../../server/src/routes/userClassController';

@Injectable()
export class UserClassesService {
    constructor(private userClassRoute: UserClassController){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await this.userClassRoute.getClassNameEnums();
    } 

    public async getClassCardsData(): Promise<Array<UserClassViewModel>> {
        return await this.userClassRoute.getClassCardsData();
    } 

    public async getClassCreationData(): Promise<ClassCreationViewModel> {
        return await this.userClassRoute.getClassCreationData();
    } 

        // POST
    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await this.userClassRoute.addUserClass(userClass);
    }
}