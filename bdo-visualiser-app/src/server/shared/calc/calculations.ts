import * as moment from 'moment';
import { GearViewModel } from '../viewModels/userClassViewModel';

export class Calculations { 
    
        // GearScore
    public calcGearScore(gear: GearViewModel): number {
        return (Math.floor((gear.ap + gear.aap) / 2) + gear.dp);
    }

        // Current Date - Formatted
    public calcCurrentDate(): string {
        return moment().format("YYYY-MM-DD");
    }
}