// import { pipe }

import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({name: 'dateLong'})
export class DateLongPipe implements PipeTransform {
    transform(dateString: any): any {
        if(dateString == "" || dateString == undefined) 
            return "";

        var momentObj = moment.unix(dateString);
        var momentString = momentObj.format('dddd, Do MMMM YYYY');

        return momentString;
    }
}