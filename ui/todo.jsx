'use strict';
require('./css/user.css');
var React = require('react');
var ReactDOM = require('react-dom');
var TodoTable = require('./react-components/todoTable.jsx');

ReactDOM.render(<TodoTable />, document.getElementById('content'));