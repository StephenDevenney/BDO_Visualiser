/*
    ## Calculate Unix Date
        date for storing.
*/
exports.calcUnixDate = function() {
    var newDate = Date.now().toString();
    // var newDateInt = Math.round(parseInt(newDate) / 1000) - Math.round((parseInt(newDate) % 86400));
    var newDateInt = parseInt(newDate) - (parseInt(newDate) % 86400);
    console.log(newDateInt);
    var returnDate = newDateInt.toString();

    return returnDate;
}