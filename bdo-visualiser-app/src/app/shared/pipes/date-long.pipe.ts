// import { pipe }

import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({name: 'dateLong'})
export class DateLongPipe implements PipeTransform {
    transform(dateString: any): any {
        if(dateString == "" || typeof(dateString) == "undefined") 
            return "";

        var momentString = moment(dateString, "YYYY-MM-DD HH:MM:SS").format('dddd, Do MMMM YYYY');
        return momentString;
    }
}

@Pipe({name: 'timeHours'})
export class TimeAmountPipe implements PipeTransform {
    transform(timeAmount: number): string {
        if(timeAmount == 0 || typeof(timeAmount) == "undefined" || timeAmount == null) 
            return "N/A";

        let timeHours = Math.floor(timeAmount/60);
        if(timeHours == 1)
            return timeHours + " Hour";
        else
            return timeHours + " Hours";
    }
}


@Pipe({name: 'noRecordPipe'})
export class NoRecordPipe implements PipeTransform {
    transform(incomingItem: any): string {
        if(typeof(incomingItem) == "undefined" || incomingItem == null) 
            return "N/A";
            
        return incomingItem;
    }
}