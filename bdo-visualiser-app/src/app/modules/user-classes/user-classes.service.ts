import { Injectable } from '@angular/core';
import { CharacterCardsViewModel, ClassCreationViewModel, ClassEditViewModel, ClassNamesEnumViewModel, UserClassViewModel } from '../../../server/shared/viewModels/userClassViewModel';
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

    public async getClassEditData(userClassId: number): Promise<ClassEditViewModel> {
        return await this.userClassRoute.getClassEditData(userClassId);
    }

        // POST
    public async addUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await this.userClassRoute.addUserClass(userClass);
    }
}