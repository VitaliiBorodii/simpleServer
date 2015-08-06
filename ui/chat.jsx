'use strict'
var React = require('react');
var ChatTable = require('./react-components/chatTable.jsx');
require('./css/chat.css');
var strings = {
    'connected': '[sys][time]%time%[/time]: You have successfully connected to server [user]%name%[/user].[/sys]',
    'userJoined': '[sys][time]%time%[/time]: User [user]%name%[/user] joined to chat.[/sys]',
    'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys][time]%time%[/time]: User [user]%name%[/user] have left thid chat.[/sys]'
};
var socket;
window.onload = function () {
    React.render(<ChatTable />, document.getElementById('chat-content'));
};