var config;
try {
config = require('./main.json');
} catch (err) {
    console.log(err)
    var env = process.env;
    config = {
        port : env.OPENSHIFT_NODEJS_PORT || env.PORT || 3002,
        ip: env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
        session: {
            secret: "sercer",
            key: "user",
            cookie: {
                maxAge: 604800000,
                httpOnly: true
            }
        },
        mongo: {
            host: env.OPENSHIFT_MONGODB_DB_HOST,
            user: env.OPENSHIFT_MONGODB_DB_USERNAME,
            port: env.OPENSHIFT_MONGODB_DB_PORT,
            uri: env.OPENSHIFT_MONGODB_DB_URL + env.OPENSHIFT_APP_NAME
        }
    }
}
module.exports = config;
