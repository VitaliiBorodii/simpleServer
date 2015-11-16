var online = [];

module.exports = function (app, server, socket) {
    var ExpressPeerServer = require('peer').ExpressPeerServer;
    app.use('/web-rtc', ExpressPeerServer(server, {
            debug: true
        }
    ));
    app.post('/web-rtc/peerjs/:id', function (req, res, next) {
        debugger
    })
}