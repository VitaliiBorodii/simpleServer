var sharedsession = require("express-socket.io-session");
var Messages = require('../models/messages');
function chatConnect(socket) {
    var session = socket.handshake.session;
    var user = {
        id: session.userId,
        name: session.userName
    };
    var time = Date.now();
    socket.json.send({
        'event': 'connected', data: {
            user: user,
            time: time
        }
    });
    socket.broadcast.json.send({
        'event': 'join', data: {
            user: user,
            time: time
        }
    });

    /* Socket event handlers */
    socket.on('message', function (data) {
        data.user = user;
        Messages.create(data, function (err, data) {
            socket.json.send({'event': 'messagesent', data: data || err});
            socket.broadcast.json.send({'event': 'newmessage', data: data || err});
        });
    });
    socket.on('typing', function (data) {
        socket.broadcast.json.send({
            'event': 'typing', data: {
                user: user,
                typing: data.type
            }
        });
    });
    socket.on('disconnect', function () {
        socket.broadcast.json.send({
            'event': 'split', data: {
                user: user,
                time: Date.now()
            }
        });
    });
};

module.exports = function (socket, session) {
    socket.use(sharedsession(session, {
        autoSave: true
    }));
    socket.on('connection', chatConnect);
    return socket;
};