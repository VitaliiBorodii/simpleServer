'use strict'
var React = require('react');
var ChatTable = require('./react-components/chatTable.jsx');
var actions = require('./factories/messagesStoreActions');
require('./css/chat.css');
window.onload = function () {
    var events = {
        connected: 'Your connection ID is: %id%',
        join: 'Joined %name%',
        split: 'Leave %name%',
        messagesent: 'you massage is %message%',
        newmessage: 'new message - %message% from %name%',
        typing: '%name% is typing a message...'
    };
    var profile = {};
    var typingId;

    function load(opts) {
        var limit = (opts ? opts.limit : 15) || 15;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/messages/?sort=-createdDate&limit=' + limit, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (err) {
                    data = {
                        content: []
                    };
                    console.error(err)
                }
                actions.loadMsgs(data.content);
            }
        }.bind(this);
        xhr.send(null);
    }

    function add(message) {
        socket.emit('message', {
            message: message
        });
    }

    function typing(type) {
        socket.emit('typing', {
            type: type
        });
    }

    function typingUser(msg) {
        if (typingId) {
            clearInterval(typingId);
        }
        var input = document.getElementsByTagName('textarea')[0];
        if (msg) {
            input.placeholder = msg;
            typingId = setTimeout(function () {
                input.placeholder = "Type message here..."
            }, 1000);
        } else {
            input.placeholder = "Type message here..."
        }
    }
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
        switch (type) {
            case 'connected':
                React.render(<ChatTable typing={typing} userId={data.id} load={load}
                                        add={add}/>, document.getElementById('chat-content'));
                load();
                break;
            case 'newmessage':
                typingUser();
                data.new = true;
                actions.addMsg(data);
                break;
            case 'messagesent':
                data.new = true;
                actions.addMsg(data);
                break;
            case 'typing':
                typingUser(msg);
                break;
            default:
                return true
        }
    });
};