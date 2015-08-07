var express = require('express');
var router = express.Router();

var messages = [];

router.get('/', function (req, res, next) {
    var name = req.session.userName;
    res.render('chat', {title: name, logged: true})
});

module.exports = router;
