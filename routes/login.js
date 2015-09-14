var User = require('../models/user');
var async = require('async');

module.exports = function (express) {
    var router = express.Router();
    router.get('/', function (req, res, next) {
        res.render('login', {login: true});
    });
    router.post('/', function (req, res, next) {
        var email = req.body.email,
            password = req.body.password;
        async.waterfall([
                function (callback) {
                    User.findOne({email: email}, callback)
                },
                function (user, callback) {
                    if (user) {
                        user.comparePassword(password, function (err, isMatch) {
                            if (err) return next(err);
                            if (isMatch) {
                                callback(null, user);
                            } else {
                                callback({
                                    status: 400,
                                    message: 'Incorrect Password'
                                });
                            }
                        });
                    } else {
                        callback({
                            status: 400,
                            message: 'No user with such Email'
                        });
                    }
                }
            ],
            function (err, user) {
                if (err) return next(err);
                req.session.userId = user.get('_id');
                req.session.userName = user.get('username');
                if (!req.body.remember) {
                    req.session.cookie.expires = false;
                }
                res.redirect('/');
            });
    });
    return router;
};