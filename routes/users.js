var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var name = req.session.userName;
    res.render('user', {name: name, title: name, logged: true})
});

module.exports = router;
