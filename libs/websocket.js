var Messages = require('../models/messages');
module.exports = function (socket) {
    var session = socket.handshake.session;
    var userName = session.userName;
    var userId = session.userId;
    var time = Date.now();
    socket.json.send({
        'event': 'connected', data: {
            userName: userName,
            id: userId,
            time: time
        }
    });
    socket.broadcast.json.send({
        'event': 'join', data: {
            userName: userName,
            time: time
        }
    });

    /* Socket event handlers */
    socket.on('message', function (data) {
        data.userId = userId;
        data.userName = userName;
        Messages.create(data, function (err, data) {
            socket.json.send({'event': 'messagesent', data: data || err});
            socket.broadcast.json.send({'event': 'newmessage', data: data || err});
        });
    });

    socket.on('disconnect', function () {
        socket.broadcast.json.send({
            'event': 'split', data: {
                userName: userName,
                time: Date.now()
            }
        });
    });
};