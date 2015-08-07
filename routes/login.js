var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});
router.post('/', function(req, res, next) {
    var email = req.body.email,
        password = req.body.password;
    async.waterfall([
        function(callback) {
            User.findOne({email : email}, callback)
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
                    status: 400,
                    message: 'Incorrect password!'
                });
            } else {
                user = new User({email: email, hashedPassword: password});
                user.save(function (err) {
                    if (err) return next(err);
                    callback(null, user);
                });
            }
        }
    ],
        function (err, user) {
            if (err) return next(err);
            req.session.userId = user.get('_id');
            req.session.userName = user.get('username') || user.get('email');
            if (!req.body.remember) {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });
});

module.exports = router;