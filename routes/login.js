var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});
router.post('/', function(req, res, next) {
    var username = req.body.username,
        password = req.body.password;
    async.waterfall([
        function(callback) {
            User.findOne({username : username}, callback)
        },
        function (user, callback) {
            if (user) {
                user.comparePassword(password, function(err, isMatch) {
                    if (err) return next(err);
                    callback(null, isMatch, user)
                });
            } else {
                callback(null, null, null);
            }
        },
        function (isMatch, user, callback) {
            if (user) {
                isMatch ? callback(null, user) : callback({
                    status: 403,
                    message: '<h2>Incorrect password!</h2>'
                });
            } else {
                user = new User({username: username, password: password});
                user.save(function (err) {
                    if (err) return next(err);
                    callback(null, user);
                });
            }
        }
    ],
        function (err, user) {
            if (err) return next(err);
            req.session.user = user.getValue('_id');
            res.render('user', {name: user.getValue('username')})
        });
});

module.exports = router;