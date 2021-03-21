import { Injectable } from '@angular/core';

@Injectable()
export class Classes {
    public classId: number = 0;
    public className: string = "";
    public classRole: string = "";
    public gear: Array<Gear> = new Array<Gear>();
}

export class Gear {
    public ap: number = 0;
    public aap: number = 0;
    public dp: number = 0
    public gearScore: number = 0;
}