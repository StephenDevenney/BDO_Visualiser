import * as moment from 'moment';
import { GearViewModel } from '../viewModels/userClassViewModel';

export class Calculations { 
    
        // GearScore
    public calcGearScore(gear: GearViewModel): number {
        return (Math.floor((gear.ap + gear.aap) / 2) + gear.dp);
    }

        // Current Date - Today
    public calcCurrentDate(): string {
        return moment().format("YYYY-MM-DD");
    }

        // Current Date - Week Begin
    public calcWeekStartDate(): string {
        return moment().subtract(7,'d').format("YYYY-MM-DD");
    }
}