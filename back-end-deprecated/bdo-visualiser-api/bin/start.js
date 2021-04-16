const SQLite = require("better-sqlite3");
require('dotenv').config();
// Open Connection
const db = new SQLite('../Database/' + process.env.DATABASE_NAME);
const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'security_user';").get();
const fs = require('fs');

// Check for tables.
if (!table['count(*)']) {
    // Load and execute sql file
    var sql = fs.readFileSync('../Database/publish.sql').toString();
    console.log("Executing SQL ...")
    db.exec(sql);
 
    // Close connection
    console.log("DB Published.")
    db.close();
}