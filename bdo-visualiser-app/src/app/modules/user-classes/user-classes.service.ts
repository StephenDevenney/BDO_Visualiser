import { Injectable } from '@angular/core';
import { ClassCreationViewModel, ClassNamesEnumViewModel, UserClassViewModel } from 'src/server/shared/viewModels/userClassViewModel';
import { UserClassController } from 'src/server/src/routes/userClassController';

@Injectable()
export class UserClassesService {
    constructor(private userClassRoute: UserClassController){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await this.userClassRoute.getClassNameEnums();
    } 

    public async getClassCardsData(): Promise<void> {
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