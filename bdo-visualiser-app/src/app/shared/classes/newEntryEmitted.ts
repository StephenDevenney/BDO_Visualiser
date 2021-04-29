import { CombatHeadersViewModel, VisibleDataViewModel } from "../../../server/shared/viewModels/combatViewModels";

export class CombatNewEntryViewModel {
    public vdVM: VisibleDataViewModel = new VisibleDataViewModel();
    public chVM: Array<CombatHeadersViewModel> = new Array<CombatHeadersViewModel>();

    constructor(vdVM?: VisibleDataViewModel, chVM?: Array<CombatHeadersViewModel>) {
        this.vdVM = vdVM;
        this.chVM = chVM;
    }
}