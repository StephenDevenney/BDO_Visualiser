import { Injectable } from '@angular/core';
import { AppUserViewModel, ConfigViewModel } from '../../../server/shared/viewModels/securityViewModels';

@Injectable()
export class Globals {
    public user: AppUserViewModel = new AppUserViewModel;
    public isSignedIn: boolean = false;
    public seriousErrorMessage: string = "";
    public previousUrl: string = "";
    public currentUrl: string = "";
    public config: ConfigViewModel = new ConfigViewModel;
    
}