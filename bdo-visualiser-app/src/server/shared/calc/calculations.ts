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

        // Current Date - Week Begin (isoWeek starts on monday, should check preference)
    public calcWeekStartDate(): string {
        return moment().startOf('isoWeek').format("YYYY-MM-DD");
    }

        // Current Date - Month Begin
    public calcMonthStartDate(): string {
        return moment().startOf('month').format("YYYY-MM-DD");
    }

        // Current Date - Year Begin
    public calcYearStartDate(): string {
        return moment().startOf('year').format("YYYY-MM-DD");
    }

    public calcMinutesToHours(minutes: number) {
        return Math.floor(minutes/60);
    }
}