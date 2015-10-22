'use strict'
var React = require('react');
module.exports = React.createClass({
    getDefaultProps: function () {
        return {};
    },
    changePage: function (e) {
        var el = e.target,
            limit = el.value;
        this.props.setLimit(limit)
    },
    next: function (e) {
        var el = e.target;
        if (el.className.indexOf('disabled') > -1) {
            return
        } else {
            this.props.setPage(+1);
        }
    },
    prev: function (e) {
        var el = e.target;
        if (el.className.indexOf('disabled') > -1) {
            return
        } else {
            this.props.setPage(-1);
        }
    },
    render: function () {
        var count = this.props.totalLength,
            page = this.props.currPage,
            total = this.props.allTotal,
            limit = this.props.currLimit,
            currBottom = limit * (page - 1),
            last = (limit * page) >= total,
            nextCls = ' active',
            prevCls = ' active';
        if (page == 1) {
            prevCls = ' disabled';
        }
        if (last) {
            nextCls = ' disabled';
        }
        return (<tr className="todoFooter">
            <td colSpan="4">
                <select defaultValue={limit} onChange={this.changePage}>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </select>
                <i onClick={this.prev} className={"fa fa-lg fa-fast-backward" + prevCls}></i>
                <span> {page} </span>
                <i onClick={this.next} val="1" className={"fa fa-lg fa-fast-forward" + nextCls}></i>
                <span> {'Shown: ' + (currBottom + 1) + ' - ' + (currBottom + +count) + ' from ' + total }</span>
            </td>
        </tr>)
    }
});