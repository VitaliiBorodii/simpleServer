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
    //displayName: 'itemRow',
    render: function () {
        var item = this.props.item;
        var name = item.name;
        var itemDone = item.done ? 'fa fa-lg fa-check-circle-o' : 'fa fa-lg fa-check';
        return (<tr>
            <td>{name}</td>
            <td><i onClick={this.makeDone} className={itemDone}></i> <i onClick={this.deleteItem}
                                                                        className="fa fa-lg fa-times-circle-o"></i></td>
        </tr>)
    }
});