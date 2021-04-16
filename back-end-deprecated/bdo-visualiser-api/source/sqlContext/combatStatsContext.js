require('dotenv').config();
const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });
