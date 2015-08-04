'use strict'
var React = require('react');
module.exports = React.createClass({
    // displayName: 'inputRow',
    addItem: function (e, id) {
        var itemName = this.getDOMNode().getElementsByTagName('input')[0].value;
        if (itemName) {
            this.props.handleAdd(itemName);
        }
    },
    render: function () {
        return (<tr className="pure-form">
            <td><input className="pure-input-1" type="text" placeholder="New Item..."/></td>
            <td><input className="pure-button pure-button-primary" type="button" onClick={this.addItem}
                       value="Add item"/></td>
        </tr>)
    }
});