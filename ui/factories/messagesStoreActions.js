var AppDispatcher = require('../dispatchers/chatDispatcher');
var StoreConstants = require('../constants/messages');

var ShoeStoreActions = {

    loadMsgs: function (data) {
        AppDispatcher.handleServerAction({
            actionType: StoreConstants.LOAD_MESSAGES,
            data: data
        })
    },
    addMsg: function (message) {
        AppDispatcher.handleServerAction({
            actionType: StoreConstants.NEW_MESSAGE,
            data: message
        })
    }

};

module.exports = ShoeStoreActions;