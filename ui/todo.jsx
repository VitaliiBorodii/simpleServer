'use strict'
require('./css/user.css');
var React = require('react');
var TodoTable = require('./react-components/todoTable.jsx');

React.render(<TodoTable />, document.getElementById('content'));