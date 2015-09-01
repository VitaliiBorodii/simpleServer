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
if (!nconf.get('port')) {
    nconf.set('port', /*env.OPENSHIFT_NODEJS_PORT ||*/ 1337)
}
if (!nconf.get('mongo')) {
    nconf.set('mongo', {
        host: env.OPENSHIFT_MONGODB_DB_HOST,
        user: env.OPENSHIFT_MONGODB_DB_USERNAME,
        port: env.OPENSHIFT_MONGODB_DB_PORT,
        uri: env.OPENSHIFT_MONGODB_DB_URL
    });
}
module.exports = nconf;