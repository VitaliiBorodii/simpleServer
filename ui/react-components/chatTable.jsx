'use strict'
var React = require('react');
var ReactDom = require('react-dom');
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
    scroll: {
        previousLimit: 0,
        scrolling: false
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
            if (this.scroll.previousLimit >= limit) return
            this.props.load({
                limit: limit
            });
            this.scroll.previousLimit = limit;
            el.scrollTop = 10;
            this.scroll.scrolling = true;
        }
    },
    editMessage: function (id, message) {
        debugger
    },
    deleteMessage: function (id) {
        debugger
    },
    componentDidUpdate: function (e) {
        if (!this.scroll.scrolling) {
            var el = ReactDom.findDOMNode(this).childNodes[0];
            el.scrollTop = el.scrollHeight;
        }
    },
    addMessage: function (message) {
        this.props.add(message);
    },
    render: function () {
        var rows = [];
        var newMsg;
        _.forEachRight(this.state.messages, function (message) {
            if (message.new) {
                newMsg = true;
            }
            rows.push(<ChatRow handleEdit={this.editMessage} user={this.props.user}
                               handleDelete={this.deleteMessage} item={message}
                               key={message._id}/>);
        }.bind(this));
        if (newMsg) {
            this.scroll.scrolling = false;
        }
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