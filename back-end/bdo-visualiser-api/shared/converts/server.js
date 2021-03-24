const SQLite = require("better-sqlite3");
const db = new SQLite('../Database/' + process.env.DATABASE_NAME, { fileMustExist: false });
const sqlContext = require("../../source/sqlContext/combatContext");
const table = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'security_user';").get();
var serverEnum;
if (table['count(*)']) {
    serverEnum = sqlContext.getServerEnums();
}

/*
    ## Server Enum Entity
        serverId
        serverName
        serverNumber
        isElviaRealm
*/
exports.convertToEntity = function(serverVM) {
    if(typeof(serverEnum) == "undefined"){
        serverEnum = sqlContext.getServerEnums();
    }

    var isElviaRealmCheck = 0;
    if(server.isElviaRealm == true)
        isElviaRealmCheck = 1;

    var serverId;
    if(newEntry.serverName != "")
        serverId = serverEnum.filter(_ => _.serverId == newEntry.server.serverId)[0].serverId;

    var serverEntity = { 
        serverId: server.serverId,
        serverName: servDescription,
        serverNumber: servDescription,
        isElviaRealm: isElviaRealmCheck
    }

    return serverEntity;
}

/*
    ## Server Enum View Model
        serverId
        serverDescription
        isElviaRealm
*/
exports.convertToViewModel = function(serverEntity) {
    var isElviaRealmCheck = false;
    if(serverEntity.isElviaRealm == 1)
        isElviaRealmCheck = true;

    var servDescription = serverEntity.serverName;
    if(serverEntity.serverNumber > 0)
        servDescription = serverEntity.serverName + " " + serverEntity.serverNumber;

    var serverViewModel = { 
        serverId: serverEntity.serverId,
        serverDescription: servDescription,
        isElviaRealm: isElviaRealmCheck
    }

    return serverViewModel;
}