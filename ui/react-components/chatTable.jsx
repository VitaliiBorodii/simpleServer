'use strict'
var React = require('react');
var _ = require('lodash');
var InputRow = require('./chatInput');
var ChatRow = require('./chatRow');
var Store = require('../stores/chatStore');

function getAppState() {
    return {
        messages: Store.getMsgs()
    };
}

module.exports = React.createClass({
    getInitialState: function () {
        return getAppState();
    },
    getDefaultProps: function () {
        return {
            scrolling: false
        }
    },
    componentDidMount: function () {
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener(this._onChange);
    },
    handleScroll: function (e) {
        var el = e.target;

        if (el.scrollTop === 0) {
            var limit = this.state.messages.length + 15;
            if (this.props.previousLimit >= limit) return
            this.props.load({
                limit: limit
            });
            this.props.previousLimit = limit;
            el.scrollTop = 10;
            this.props.scrolling = true;
        }
    },
    editMessage: function (id, message) {
        debugger
    },
    deleteMessage: function (id) {
        debugger
    },
    componentDidUpdate: function (e) {
        if (!this.props.scrolling) {
            var el = this.getDOMNode().childNodes[0];
            el.scrollTop = el.scrollHeight;
        }
    },
    addMessage: function (message) {
        this.props.add(message);
    },
    render: function () {
        var rows = [];
        _.forEachRight(this.state.messages, function (message) {
            if (message.new) {
                this.props.scrolling = false;
            }
            rows.push(<ChatRow handleEdit={this.editMessage} userId={this.props.userId}
                               handleDelete={this.deleteMessage} item={message}
                               key={message._id}/>);
        }.bind(this));
        return (
            <div className="chatWrapper">
                <div onScroll={this.handleScroll} className="chatBody">
                    <ol>
                        {rows}
                    </ol>
                </div>
                <InputRow typing={this.props.typing} handleSend={this.addMessage}/>
            </div>
        );
    },
    _onChange: function () {
        this.setState(getAppState());
    }
});