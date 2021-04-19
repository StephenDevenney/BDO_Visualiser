import { NavMenuContext } from '../sqlContext/securityContext';
import { NavMenuViewModel } from '../../shared/viewModels/securityViewModels';
import { NavMenuEntity } from '../../shared/entities/securityEntities';

export class NavMenuHandler {
    private navMenu: NavMenuContext = new NavMenuContext();

    public async getNavMenu(): Promise<Array<NavMenuViewModel>> {
        let nmvm = new Array<NavMenuViewModel>();
        await this.navMenu.getAll().then((_ : Array<NavMenuEntity>) => {
            _.forEach(row => {
                nmvm.push(new NavMenuViewModel(row.navName,  row.navTitle, row.navRoute));
            });
        });
        return nmvm;
    }
}