const sqlContext = require("../sqlContext/securityContext");
var globalUserId = "1";

// // GET

exports.getAllUsers = function(res) {
    var users = sqlContext.getAllUsers();

    if(users.length > 0)
        return res.json(users);
    else
        return res.status(400).json({ msg: `Users not found.`});
}

exports.getUser = function(userId, res) {
    var user = sqlContext.getUser(userId);
    globalUserId = user.userId;

    if(user != undefined)
        return res.json(user);
    else
        return res.status(400).json({ msg: `User not found with id of ${userId}.`});
}

exports.getConfigSettings = function(res) {
    var user = sqlContext.getUser(globalUserId);
    var settings = sqlContext.getConfigSettings(globalUserId);

    if(settings != undefined)
        return res.json({user, settings});
    else
        return res.status(400).json({ msg: `User not found.`});
}

exports.getNavMenu = function(res) {
    var menu = sqlContext.getNavMenu(globalUserId);

    if(menu != undefined)
        return res.json({menu});
    else
        return res.status(400).json({ msg: `Error retrieving menu.`});
}

exports.getThemes = function(res) {
    var themes = sqlContext.getThemes();

    if(themes != undefined)
        return res.json(themes);
    else
        return res.status(400).json({ msg: `Error retrieving themes.`});
}

// Discord Redirect
exports.handleRedirect = function(req, res) {
    console.log(req);
}

// // POST

exports.createUser = function(user, res) {
    if(!user.userName)
        return res.status(400).json({ msg: `Username Required.` });

    var newUser = { userName: user.userName }; 
    var user = sqlContext.createUser(newUser);
    return res.json(user.get());
}

// // PUT

exports.updateSettings = function(newSettings, res) {
    // var currentSettings = sqlContext.getConfigSettings(globalUserId);
    sqlContext.updateTheme(newSettings.theme.themeId, globalUserId);
}