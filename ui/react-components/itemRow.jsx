'use strict'
var React = require('react');
module.exports = React.createClass({
    makeDone: function () {
        if (this.props.item.done) return;
        var id = this.props.item._id;
        this.props.makeDone(id);
    },
    deleteItem: function () {
        var id = this.props.item._id;
        this.props.deleteItem(id);
    },
    render: function () {
        var item = this.props.item,
            name = item.name,
            label = 'fa fa-lg ',
            className;
        if (item.done) {
            className = 'item-done';
            label += 'fa-check-circle-o';
        } else {
            label += 'fa-check';
        }
        return (<tr className={className}>
            <td>{name}</td>
            <td><i onClick={this.makeDone} className={label}></i> <i onClick={this.deleteItem}
                                                                     className="fa fa-lg fa-times"></i></td>
        </tr>)
    }
});