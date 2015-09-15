var nconf = require('nconf');
nconf.argv()
    .env()
    .file({file: './config/main.json'});
nconf.defaults({
    session: {
        secret: "random Secret",
        key: "user",
        cookie: {
            maxAge: 604800000,
            httpOnly: true
        }
    }
});
var env = process.env;
if (!nconf.get('server')) {
    nconf.set('server', {
        port : env.OPENSHIFT_NODEJS_PORT || env.PORT || 1337,
        ip: env.OPENSHIFT_NODEJS_IP || "127.0.0.1"
    });
}
if (!nconf.get('mongo')) {
    nconf.set('mongo', {
        uri: env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/dev'
    });
}
module.exports = nconf;
