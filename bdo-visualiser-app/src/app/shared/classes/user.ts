import { Injectable } from '@angular/core';

@Injectable()
export class User {
    public userId: number = 0;
    public userName: string = "";
    public userRoleId: number = 0;
}

@Injectable()
export class PageUserRoleAccess {
    public path: string = "";
    public userRoles: Array<number> = [];
}


