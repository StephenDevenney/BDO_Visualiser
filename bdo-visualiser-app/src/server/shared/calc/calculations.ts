import moment from 'moment';

export class Calculations { 
    
        // GearScore
    public calcGearScore(ap: number, aap: number, dp: number): number {
        return (Math.floor((ap + aap) / 2) + dp);
    }

        // Current Date - Formatted
    public calcCurrentDate(): string {
        return moment().format("YYYY-MM-DD");
    }
}