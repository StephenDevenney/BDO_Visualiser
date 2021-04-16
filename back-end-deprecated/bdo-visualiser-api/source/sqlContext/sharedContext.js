require('dotenv').config();
const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });

// Get
exports.getLocations = function() {
    return db.prepare("SELECT locationId, locationName, enum_territory.territoryName as territoryName FROM enum_locations INNER JOIN enum_territory ON enum_territory.territoryId = enum_locations.FK_territoryId").all();
}