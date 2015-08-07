'use strict'
var React = require('react');
var _ = require('lodash');
var InputRow = require('./chatInput');
var ChatRow = require('./chatRow');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            messages: []
        };
    },
    componentDidMount: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/messages/?limit=15', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (err) {
                    data = [];
                    console.error(err)
                }
                this.setState({
                    messages: data
                })
            }
        }.bind(this);
        xhr.send(null);
    },
    editMessage: function (id, message) {
        debugger
    },
    deleteMessage: function (id) {
        debugger
    },
    componentDidUpdate: function (e) {
        var el = this.getDOMNode().childNodes[0];
        el.scrollTop = el.scrollHeight;
    },
    addMessage: function (message) {
        var state = this.state.messages;
        this.props.sendMessage(message)
        state.push({
            _id: Math.random(),
            userName: 'vasya',
            createdDate: Date.now(),
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
                    <ol>
                        {rows}
                    </ol>
                </div>
                <InputRow handleSend={this.addMessage}/>
            </div>
        );
    }
});