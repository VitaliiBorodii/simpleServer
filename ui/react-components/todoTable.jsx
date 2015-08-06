'use strict'
var React = require('react');
var _ = require('lodash');
var ItemRow = require('./itemRow');
var InputRow = require('./inputRow');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            items: []
        };
    },
    componentDidMount: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/todos', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var data;
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (err) {
                    data = [];
                    console.error(err)
                }
                this.setState({
                    items: data
                })
            }
        }.bind(this);
        xhr.send(null);
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
                this.componentDidMount();
            }
        }.bind(this);
        xhr.send(JSON.stringify(data));
    },
    makeDelete: function (id) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/todos/' + id, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                this.componentDidMount();
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
                this.componentDidMount();
            }
        }.bind(this);
        xhr.send(JSON.stringify(data));
    },
    render: function () {
        var rows = [];
        _.forEach(this.state.items, function (item) {
            rows.push(<ItemRow handleEdit={this.markDone} handleDelete={this.makeDelete} item={item} key={item._id}/>);
        }.bind(this));
        return (
            <table className="pure-table pure-table-bordered">
                <thead>
                <InputRow handleAdd={this.addItem}/>
                </thead>
                <tbody>
                <tr>
                    <td>Item Name</td>
                    <td>Status</td>
                    <td>Delete</td>
                </tr>
                {rows}
                </tbody>
            </table>
        );
    }
});