'use strict'
var React = require('react');
module.exports = React.createClass({
    addItem: function (e, id) {
        e.preventDefault();
        var input = this.getDOMNode().getElementsByTagName('textarea')[0];
        var itemName = input.value;
        if (itemName) {
            this.props.handleSend(itemName);
            input.value = '';
        }
    },
    render: function () {
        return (<div>
            <form className="pure-form chatInput" onSubmit={this.addItem}>
                <textarea style={{marginRight: "10px"}} placeholder="Type message here..."/>
                <button className="pure-button pure-button-primary" type="submit">Send</button>
            </form>
        </div>)
    }
});