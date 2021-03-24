import { Injectable } from '@angular/core';

@Injectable()
export class UserClass {
    public classId: number = 0;
    public className: string = "";
    public classRole: string = "";
    public primaryCombatTypeDescription: string = "";
    public gear: Gear = new Gear();
    public description: string = "";
}

export class Gear {
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0
    public gearScore: number = 0;
}