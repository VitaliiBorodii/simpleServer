'use strict'
var React = require('react');
var ChatTable = require('./react-components/chatTable.jsx');
require('./css/chat.css');
window.onload = function () {
    var events = {
        connected: 'Your connection ID is: %id%',
        join: 'Joined %name%',
        split: 'Leave %name%',
        messagesent: 'you msesage is %message%',
        newmessage: 'new message - %message% from %name%'
    };
    var profile = {};

    var socket = io.connect(location.protocol + '//' + location.host);
    socket.on('connect', function (data) {
        profile = data;
    });
    socket.on('message', function (message) {
        var type = message.event,
            data = message.data,
            str = events[type];
        var msg = str.replace(/%id%/, data.id).replace(/%name%/, data.userName).replace(/%message%/, data.message);
        console.log(msg)
    });
    var sendMessage = function (msg) {
        socket.emit('message', {
            message: msg
        });
    };
    React.render(<ChatTable sendMessage={sendMessage}/>, document.getElementById('chat-content'));
};