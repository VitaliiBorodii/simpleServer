'use strict'
var React = require('react');
module.exports = React.createClass({
    makeDone: function () {
        if (this.props.item.done) return;
        var id = this.props.item._id;
        this.props.handleEdit(id);
    },
    deleteItem: function () {
        var id = this.props.item._id;
        this.props.handleDelete(id);
    },
    render: function () {
        var item = this.props.item,
            name = item.name,
            check = item.checked,
            iconCls = 'fa fa-lg ',
            className,
            label;
        if (item.done) {
            className = 'disabled';
            iconCls += 'fa-check-circle-o';
            label = '(Done)';
        } else {
            iconCls += 'fa-check';
            label = '(Undone)';
        }

        return (<tr className={className}>
            <td><input id="remember" className="pure-checkbox" type="checkbox" defaultChecked={check}/></td>
            <td>{name}</td>
            <td onClick={this.makeDone}><span><i className={iconCls}></i></span></td>
            <td onClick={this.deleteItem}><span><i className="fa fa-lg fa-times"></i></span></td>
        </tr>)
    }
});