/*
    ## Calculate Unix Date
        date for storing.
*/
exports.calcUnixDate = function() {
    var newDate = Date.now().toString();
    var newDateInt = Math.round(parseInt(newDate) - (parseInt(newDate) % 86400));
    var returnDate = newDateInt.toString();

    return returnDate;
}