'use strict'
var React = require('react');
var pre = {
    1: 'one',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen'
};
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
            name;
        var today = new Date(),
            tYear = today.getFullYear(),
            tMonth = today.getMonth(),
            tDay = today.getDate();
        var date = (function (d) {
                var date = new Date(d || null),
                    year = date.getFullYear(),
                    month = date.getMonth();
            if (tYear === year) {
                if (tMonth === month) {
                    var day = date.getDate(),
                        hours = date.getHours(),
                        minutes = date.getMinutes(),
                        seconds = date.getSeconds();
                    minutes = minutes.toString().length < 2 ? '0' + minutes : minutes;
                    seconds = seconds.toString().length < 2 ? '0' + seconds : seconds;
                    var time = [hours, minutes, seconds].join(':');
                    if (tDay === day) {
                        date = 'Today at ' + time;
                    } else if (tDay - 1 === day) {
                        date = 'Yesterday at ' + time;
                    } else if (tDay > day) {
                        date = pre[tDay - day] + ' days ago at ' + time;
                    }
                } else if (tMonth > month) {
                    date = pre[tMonth - month] + ' months ago';
                }
            } else {
                date = pre[tYear - year] + ' years ago';
            }
            return date
            })(item.createdDate);
        var className,
            mine = item.user.id === this.props.user.id;
        if (mine) {
            className = 'bubble bubble-alt';
            name = 'You'
        } else {
            className = 'bubble';
            name = item.user.name
        }
        if (item.new) {
            className += ' appearance';
        }
        return (<li>
            <div className={className}>
                <span className="info"><b>{name}</b> {date}</span>
                <p>{message}</p>
            </div>
        </li>)
    }
});