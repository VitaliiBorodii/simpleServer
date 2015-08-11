var AppDispatcher = require('../dispatchers/chatDispatcher');
var Constants = require('../constants/messages');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var _messages = [];

function loadMsgs(data) {
    _messages = data;
}

function addMsg(message) {
    _messages.unshift(message);
}

var ShoeStore = _.merge(EventEmitter.prototype, {

    getMsgs: function () {
        return _messages;
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }

});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    var text;
    switch (action.actionType) {
        case Constants.LOAD_MESSAGES:
            loadMsgs(action.data);
            break;
        case Constants.NEW_MESSAGE:
            addMsg(action.data);
            break;
        default:
            return true;
    }

    ShoeStore.emitChange();

    return true;

});

module.exports = ShoeStore;