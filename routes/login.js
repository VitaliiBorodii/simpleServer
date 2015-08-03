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
                    status: 403,
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
            if (!req.body.remember) {
                req.session.cookie.maxAge = null
            }
            res.redirect('users');
        });
});

module.exports = router;