'use strict'
var React = require('react');
module.exports = React.createClass({
    addItem: function (e, id) {
        e.preventDefault();
        var input = this.getDOMNode().getElementsByTagName('input')[0];
        var itemName = input.value;
        if (itemName) {
            this.props.handleSend(itemName);
            input.value = '';
        }
    },
    render: function () {
        return (<div>
            <form className="pure-form" onSubmit={this.addItem}>
                <input style={{marginRight: "10px"}} type="text" placeholder="Type message here..."/>
                <input className="pure-button pure-button-primary" type="submit" value="Send"/>
            </form>
        </div>)
    }
});