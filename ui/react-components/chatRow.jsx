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
            date = (function (d) {
                var date = new Date(d || null),
                    year = date.getFullYear(),
                    month = date.getMonth(),
                    day = date.getDate(),
                    hours = date.getHours(),
                    minutes = date.getMinutes(),
                    seconds = date.getSeconds();
                return /*[day,month,year].join('/') + ' ' +*/ [hours, minutes, seconds].join(':')
            })(item.createdDate);
        return (<li className="chatMessage">
            <div className="info">
                <p><b>{name}</b> {' wrote:'}<br /> {'at '} {date}</p>
            </div>
            <div className="arrow_box">
                <p>{message}</p>
            </div>
        </li>)
    }
});