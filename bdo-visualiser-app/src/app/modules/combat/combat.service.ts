import { Injectable } from '@angular/core';
import { CombatHeadersViewModel, CombatPageDataViewModel, CombatPageEnumsViewModel, UserClassViewModel } from '../../../server/shared/viewModels/combatViewModels';
import { CombatController } from '../../../server/src/routes/combatController';

@Injectable()
export class CombatService {
    constructor(private combatRoute: CombatController){}

        // GET
    public async getCombatPageData(): Promise<CombatPageDataViewModel> {
        return await this.combatRoute.getCombatData();
    }

    public async getCombatEnums(): Promise<CombatPageEnumsViewModel> {
        return await this.combatRoute.getCombatEnums();
    }

        // PUT
    public async saveCombatHeaders(columns: Array<CombatHeadersViewModel>): Promise<Array<CombatHeadersViewModel>> {
        return await this.combatRoute.updateCombatHeaders(columns);
    }

    public async saveSingleCombatHeader(column: CombatHeadersViewModel): Promise<CombatHeadersViewModel> {
        return await this.combatRoute.updateSingleVisibleColumn(column);
    }

        // POST
    public async addMainUserClass(userClass: UserClassViewModel): Promise<UserClassViewModel> {
        return await this.combatRoute.addMainUserClass(userClass);
    }

    // public getDefaultColumns() {
    //     // return this.http.get(this.globals.config.appApiUrl + "combat/column-defaults");
    // }

    // public getTotals() {
    //     // return this.http.get(this.globals.config.appApiUrl + "combat/totals");
    // }

    // public getLocations() {
    //     // return this.http.get(this.globals.config.appApiUrl + "shared/locations");
    // }

    // public getTrashLootTotals(locationId: number) {
    //     // return this.http.get(this.globals.config.appApiUrl + "combat/trashloot-totals/" + locationId);
    // }

    // public saveCombatHeaders(combatHeaders: Array<GrindingTableHeaders>): Promise<any> {
    //     // return this.http.put(this.globals.config.appApiUrl + "combat/active-columns", JSON.stringify(combatHeaders)).toPromise();
    // }

    // public getAllClassNames() {
    //     // return this.http.get(this.globals.config.appApiUrl + "combat/class-names");
    // }

    // public getMainClass(): Promise<any> {
    //     // return this.http.get(this.globals.config.appApiUrl + "combat/main-class").toPromise();
    // }

    // public addMainClass(classToSave: UserClass) {
    //     return this.http.post(this.globals.config.appApiUrl + "combat/create-main-class", JSON.stringify(classToSave));
    // }

    // public getCombatEnums() {
    //     return this.http.get(this.globals.config.appApiUrl + "combat/enums");
    // }

    // public saveGrindingEntry(newEntry: GrindingData): Promise<any> {
    //     return this.http.post(this.globals.config.appApiUrl + "combat/new-entry", JSON.stringify(newEntry)).toPromise();
    // }

    // public updateSingleVisibleColumn(combatHeader: GrindingTableHeaders) {
    //     return this.http.put(this.globals.config.appApiUrl + "combat/visible-column", JSON.stringify(combatHeader));
    // }

    // public uploadGrindingData(files: Array<GrindingData>): Promise<any> {
    //     let origin = "combat";
    //     console.log(files);
    //     return this.http.post(this.globals.config.appApiUrl + "combat/data-upload", JSON.stringify(files)).toPromise();
    // }
}