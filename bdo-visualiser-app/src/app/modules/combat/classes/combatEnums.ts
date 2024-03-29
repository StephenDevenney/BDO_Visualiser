import { Injectable } from '@angular/core';

@Injectable()
export class CombatPageEnums {
    public classNamesEnum: Array<ClassNamesEnum> = new Array<ClassNamesEnum>();
    public locationNamesEnum: Array<LocationNamesGroupedEnum> = new Array<LocationNamesGroupedEnum>();
    public serverNamesEnum: Array<ServerNamesEnum> = new Array<ServerNamesEnum>();
    public combatTypesEnum: Array<CombatTypesEnum> = new Array<CombatTypesEnum>();
    public timeAmountEnum: Array<TimeAmountEnum> = new Array<TimeAmountEnum>();
}

@Injectable()
export class ClassNamesEnum {
    public classId: number = 1;
    public className: string = "-";
}

@Injectable()
export class LocationNamesEnum {
    public locationId: number = 1;
    public territoryId: number = 1;
    public locationName: string = "-";
    public territoryName: string = "-";
    public recommendedLevel: string = "";
    public recommendedAP: string = "";
}

export class LocationNamesGroupedEnum {
    public label: string = "-";
    public items: Array<LocationNamesEnum> = new Array<LocationNamesEnum>();
}

@Injectable()
export class ServerNamesEnum {
    public serverId: number = 1;
    public serverDescription: string = "-";
    public isElviaRealm: boolean = false;
}

@Injectable()
export class CombatTypesEnum {
    public combatTypeId: number = 1;
    public combatTypeName: string = "-";
}

@Injectable()
export class TimeAmountEnum {
    public timeId: number = 1;
    public timeAmount: number = 60;
}
