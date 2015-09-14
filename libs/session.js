var expressSession = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(expressSession);
module.exports = function (config) {
    return expressSession({
        cookie: config.get('session:cookie'),
        key: config.get('session:name'),
        secret: config.get('session:secret'),
        store: new MongoDBStore({
            uri: config.get('mongo:uri')
        }),
        proxy: true,
        resave: true,
        saveUninitialized: true
    });
}