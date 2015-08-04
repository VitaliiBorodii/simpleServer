'use strict'
var React = require('react');
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
        var old = this.state.items;
        old.push(data);
        this.setState({items: old});
        xhr.send(JSON.stringify(data));
    },
    render: function () {
        var rows = [];
        this.state.items.forEach(function (item) {
            rows.push(<ItemRow item={item} key={item.id}/>);
        }.bind(this));
        return (
            <table className="pure-table pure-table-bordered">
                <thead>
                <InputRow handleAdd={this.addItem}/>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
});