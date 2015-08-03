var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('user controller');
    User.findById(req.session.userId, function (err, user) {
        if (err) return next(err);
        var name = user.getValue('username');
        res.render('user', {name: name, title: name || 'Anonymous'})
    });
});

module.exports = router;
