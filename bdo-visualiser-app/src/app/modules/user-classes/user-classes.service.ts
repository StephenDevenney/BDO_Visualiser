import { Injectable } from '@angular/core';
import { ClassNamesEnumViewModel } from 'src/server/shared/viewModels/userClassViewModel';
import { UserClassController } from 'src/server/src/routes/userClassController';

@Injectable()
export class UserClassesService {
    constructor(private userClassRoute: UserClassController){}

        // GET
    public async getClassNameEnums(): Promise<Array<ClassNamesEnumViewModel>> {
        return await this.userClassRoute.getClassNameEnums();
    } 

        // POST
    // public async addMainUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
    //     return await this.userClassRoute.addMainUserClass(userClass);
    // }
}