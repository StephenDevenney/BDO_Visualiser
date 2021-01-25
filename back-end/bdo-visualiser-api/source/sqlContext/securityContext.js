require('dotenv').config();
const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });

// // GET

exports.getAllUsers = function() {
    return db.prepare("SELECT * FROM security_user;").all();
}

exports.getUser = function(userId) {
    return db.prepare("SELECT * FROM security_user WHERE userId = ?;").get(userId);
}

exports.getConfigSettings = function(userId) {
    return db.prepare("SELECT security_settings.settingsId, security_settings.FK_themeId AS themeId, enum_theme.themeName AS themeName, enum_theme.className AS className, enum_appIdleSecs.idleTime AS appIdleSecs, security_settings.navMinimised FROM security_settings INNER JOIN enum_theme ON enum_theme.themeId = security_settings.FK_themeId INNER JOIN enum_appIdleSecs ON enum_appIdleSecs.appIdleSecsId = security_settings.FK_appIdleSecsId WHERE security_settings.FK_userId = ?").get(userId);
}

exports.getNavMenu = function(userId) {
    return db.prepare("SELECT security_navMenu.navName AS navName, security_navMenu.navRoute AS navRoute, security_navMenu.navTitle AS navTitle FROM security_settings INNER JOIN security_navRole ON security_navRole.FK_navMenuId = security_navMenu.navMenuId INNER JOIN security_navMenu ON security_navMenu.navMenuId = security_navRole.FK_navMenuId INNER JOIN security_user ON security_user.FK_roleId = security_navRole.FK_roleId WHERE security_settings.FK_userId = ?").all(userId);
}

exports.getThemes = function() {
    return db.prepare("SELECT * FROM enum_theme").all();
}

// // POST
exports.createUser = function(newUser) {
    db.prepare("INSERT OR REPLACE INTO security_user (userName) VALUES (@userName);").run(newUser);  
    return db.prepare("SELECT * FROM security_user ORDER BY userId DESC LIMIT 1;").get();  
}


// // PUT
exports.updateTheme = function(themeId, userId) {
    db.prepare("UPDATE security_settings SET FK_themeId = ? WHERE FK_userId = ?").run(themeId, userId);  
}