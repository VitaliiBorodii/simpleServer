'use strict'
var React = require('react');
module.exports = React.createClass({
    edit: function () {
        if (this.props.item.done) return;
        var id = this.props.item._id;
        this.props.handleEdit(id);
    },
    delete: function () {
        var id = this.props.item._id;
        this.props.handleDelete(id);
    },
    render: function () {
        var item = this.props.item,
            message = item.message,
            name = item.userName,
            date = item.createdDate;
        return (<li className="chatMessage">
            <span>{name}</span>
            <span>{date}</span>

            <div className="bubble">
                {message}
            </div>
        </li>)
    }
});