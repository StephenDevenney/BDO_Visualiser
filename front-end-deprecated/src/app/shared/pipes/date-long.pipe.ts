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