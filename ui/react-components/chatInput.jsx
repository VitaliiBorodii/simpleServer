'use strict'
var React = require('react');
module.exports = React.createClass({
    keyUp: function (e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            this.addItem(e)
        } else if (e.keyCode >= 48 && e.keyCode <= 111) {
            this.props.typing(true);
        }
    },
    addItem: function (e, id) {
        e.preventDefault();
        var input = this.getDOMNode().getElementsByTagName('textarea')[0];
        var itemName = input.value.trim();
        if (itemName) {
            this.props.handleSend(itemName);
            input.value = '';
        }
    },
    render: function () {
        return (<div>
            <form className="pure-form chatInput" onSubmit={this.addItem}>
                <textarea onKeyUp={this.keyUp} style={{marginRight: "10px"}} placeholder="Type message here..."/>
                <button className="pure-button pure-button-primary" type="submit">Send</button>
            </form>
        </div>)
    }
});