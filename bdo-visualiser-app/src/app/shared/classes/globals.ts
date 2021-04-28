import { Injectable } from '@angular/core';
import { AppUserViewModel, ConfigViewModel } from '../../../server/shared/viewModels/securityViewModels';
import { remote } from 'electron';

@Injectable()
export class Globals {
    public user: AppUserViewModel = new AppUserViewModel;
    public isSignedIn: boolean = false;
    public seriousErrorMessage: string = "";
    public previousPageId: number = 0;
    public currentPageId: number = 0;
    public config: ConfigViewModel = new ConfigViewModel;

    
    public getUserPath(): string {
        return remote.app.getPath('userData');
    }
}