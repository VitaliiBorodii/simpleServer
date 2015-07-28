var session = require('express-session');
var db = require('./mongo').db;
var MongoStore = require('connect-mongo')(session);
console.log(db);
debugger

module.exports = session({
    cookie: { maxAge: 1000*60*2 } ,
    secret: "session secret" ,
    store: new MongoStore({
        dbname: db.db.databaseName,
        host: db.db.serverConfig.host,
        port: db.db.serverConfig.port,
        username: db.uri.username,
        password: db.uri.password
    })
});