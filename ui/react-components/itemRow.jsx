'use strict'
var React = require('react');
module.exports = React.createClass({
    //displayName: 'itemRow',
    render: function () {
        var item = this.props.item;
        var name = item.name;
        var done = item.done ? '+' : '-';
        return (<tr>
            <td>{name}</td>
            <td>{done}</td>
        </tr>)
    }
});