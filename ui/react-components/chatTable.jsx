'use strict'
var React = require('react');
var _ = require('lodash');
var InputRow = require('./chatInput');
var ChatRow = require('./chatRow');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            messages: [{
                _id: 564,
                userName: 'vasya',
                date: (new Date).toLocaleDateString(),
                message: 'test message'
            }]
        };
    },
    editMessage: function (id, message) {
        debugger
    },
    deleteMessage: function (id) {
        debugger
    },
    addMessage: function (message) {
        console.log(message)
        var state = this.state.messages;
        state.push({
            _id: Math.random(),
            userName: 'vasya',
            createdDate: (new Date).toLocaleDateString(),
            message: message
        });
        this.setState(state);
    },
    render: function () {
        var rows = [];
        _.forEach(this.state.messages, function (message) {
            rows.push(<ChatRow handleEdit={this.editMessage} handleDelete={this.deleteMessage} item={message}
                               key={message._id}/>);
        }.bind(this));
        return (
            <div className="chatWrapper">
                <div className="chatBody">
                    <ul className="conversation">
                        {rows}
                    </ul>
                </div>
                <InputRow handleSend={this.addMessage}/>
            </div>
        );
    }
});