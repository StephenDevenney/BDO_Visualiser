import { Injectable } from '@angular/core';
import { Config } from './config';
import { User, PageUserRoleAccess } from './user';

@Injectable()
export class Globals {
    public user: User = new User;
    public isSignedIn: boolean = false;
    public seriousErrorMessage: string = "";
    // public encryptDecryptKey: string = "";
    public previousUrl: string = "";
    public currentUrl: string = "";
    public pageUserRoleAccess: Array<PageUserRoleAccess> = [];
    public config: Config = new Config;
    
}