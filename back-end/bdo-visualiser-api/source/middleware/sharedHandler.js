const sqlContext = require("../sqlContext/sharedContext");
const csv = require('csv-parser');
const fs = require('fs')
var globalUserId = "1";

// // GET
exports.getLocations = function(res) {
    return res.json(sqlContext.getLocations());
}

// POST
exports.dataUpload = async function(origin, uploadedFiles, res) {
    console.log(origin);
    console.log(uploadedFiles);
    // fs.createReadStream('data.csv')
    // .pipe(csv())
    // .on('headers', (headers) => {
    //     console.log(`First header: ${headers[0]}`)
    // });

    return res.json(uploadedFiles);
}