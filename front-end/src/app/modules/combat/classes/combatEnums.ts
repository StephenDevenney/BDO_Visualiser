import { Injectable } from '@angular/core';

@Injectable()
export class CombatPageEnums {
    public classNamesEnum: Array<ClassNamesEnum> = new Array<ClassNamesEnum>();
    public locationNamesEnum: Array<LocationNamesEnum> = new Array<LocationNamesEnum>();
    public serverNamesEnum: Array<ServerNamesEnum> = new Array<ServerNamesEnum>();
    public combatTypesEnum: Array<CombatTypesEnum> = new Array<CombatTypesEnum>();
    public timeAmountEnum: Array<TimeAmountEnum> = new Array<TimeAmountEnum>();
}

@Injectable()
export class ClassNamesEnum {
    public classId: number = 0;
    public className: string = "";
}

@Injectable()
export class LocationNamesEnum {
    public locationId: number = 0;
    public territoryId: number = 0;
    public locationName: string = "";
    public territoryName: string = "";
}

@Injectable()
export class ServerNamesEnum {
    public serverId: number = 0;
    public serverDescription: string = "";
    public isElviaRealm: boolean = false;
}

@Injectable()
export class CombatTypesEnum {
    public combatTypeId: number = 0;
    public combatTypeName: string = "";
}

@Injectable()
export class TimeAmountEnum {
    public timeId: number = 0;
    public timeAmount: number = 0;
}
