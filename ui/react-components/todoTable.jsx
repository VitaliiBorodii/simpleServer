'use strict'
var React = require('react');
var _ = require('lodash');
var ItemRow = require('./itemRow');
var InputRow = require('./inputRow');
var Footer = require('./paggingFooter');
module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            limit: 10,
            page: 1,
            total: Infinity
        }
    },
    setLimit: function (limit) {
        this.setProps({'limit': limit});
        this.setProps({'page': 1});
        this.fetchData();
    },
    setPage: function (val) {
        var nexPage = this.setProps({page: this.props.page + val});
        nexPage = (nexPage > 0) ? nexPage : 1;
        this.setProps({'page': nexPage});
        this.fetchData();
    },
    getInitialState: function () {
        return {
            items: []
        };
    },
    fetchData: function () {
        var page = this.props.page,
            limit = this.props.limit;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/todos?page=' + page + '&limit=' + limit, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (err) {
                    data = {};
                    console.error(err)
                }
                if (data.page) {
                    this.setProps({total: data.page.total});
                }
                this.setState({
                    items: data.content
                });
            }
        }.bind(this);
        xhr.send(null);
    },
    componentDidMount: function () {
        console.log('mounted');
        this.fetchData();
    },
    markDone: function (id) {
        var data = {
            done: true
        };
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/todos/' + id, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                this.fetchData();
            }
        }.bind(this);
        xhr.send(JSON.stringify(data));
    },
    selectAll: function (e) {
        var el = e.target;
        _.forEach(this.state.items, function (item) {
            item.checked = el.checked;
        });
        this.setState(this.state);
    },
    makeDelete: function (id) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/todos/' + id, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                this.fetchData();
            }
        }.bind(this);
        xhr.send(null);
    },
    addItem: function (item) {
        var data = {
            name: item
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/todos', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                this.fetchData();
            }
        }.bind(this);
        xhr.send(JSON.stringify(data));
    },
    render: function () {
        var rows = [];
        var length = 0;
        _.forEach(this.state.items, function (item) {
            length++;
            rows.push(<ItemRow handleEdit={this.markDone} handleDelete={this.makeDelete} item={item} key={item._id}/>);
        }.bind(this));
        return (
            <table className="pure-table pure-table-bordered">
                <thead>
                <InputRow handleAdd={this.addItem}/>
                </thead>
                <tbody>
                <tr>
                    <td><input onClick={this.selectAll} className="pure-checkbox" type="checkbox"/></td>
                    <td>Item Name</td>
                    <td>Status</td>
                    <td>Delete</td>
                </tr>
                {rows}
                <Footer allTotal={this.props.total} setPage={this.setPage} setLimit={this.setLimit}
                        currLimit={this.props.limit} currPage={this.props.page} totalLength={length}/>
                </tbody>
            </table>
        );
    }
});