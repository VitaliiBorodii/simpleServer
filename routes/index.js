var express = require('express');
var router = express.Router();

var auth = require('../libs/auth');
var home = require('./home')(express);
var signin = require('./signin')(express);
var login = require('./login')(express);
var logout = require('./logout')(express);
var chat = require('./chat')(express);
var todos = require('./todos')(express);
var mypage = require('./mypage')(express);
var messages = require('./messages')(express);
module.exports = function (app) {

    app.use('/', home);

    app.use('/signin', signin);

    app.use('/login', login);

    //Everything else require authentification
    app.use(auth);

    app.use('/logout', logout);

    app.use('/chat', chat);

    app.use('/messages', messages);

    app.use('/todos', todos);

    app.use('/mypage', mypage)
};
