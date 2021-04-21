import { Injectable } from '@angular/core';
import { AppUserViewModel, ConfigViewModel } from '../../../server/shared/viewModels/securityViewModels';

@Injectable()
export class Globals {
    public user: AppUserViewModel = new AppUserViewModel;
    public isSignedIn: boolean = false;
    public seriousErrorMessage: string = "";
    public previousPageId: number = 0;
    public currentPageId: number = 0;
    public config: ConfigViewModel = new ConfigViewModel;
    
}