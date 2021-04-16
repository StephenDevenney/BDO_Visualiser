var moment = require('moment');
/*
    ## Calculate Unix Date
        date for storing.
*/
exports.calcUnixDate = function() {
    var date = moment().format("YYYY-MM-DD");

    return date;
}