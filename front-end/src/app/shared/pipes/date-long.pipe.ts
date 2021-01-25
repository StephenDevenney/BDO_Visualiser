// import { pipe }

import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({name: 'dateLong'})
export class DateLongPipe implements PipeTransform {
    transform(dateString: any): any {
        if(dateString == "" || dateString == undefined) 
            return "";

        var date = new Date(dateString);
        var tempDate = moment(date).format('dddd, Do MMMM YYYY');
        return tempDate;
    }
}