var User = require('../models/user');
var async = require('async');

module.exports = function (express) {
    var router = express.Router();
    router.get('/', function (req, res, next) {
        res.render('login', {login: false});
    });
    router.post('/', function (req, res, next) {
        var email = req.body.email,
            password = req.body.password,
            name = req.body.name;
        async.waterfall([
                function (callback) {
                    User.findOne({email: email}, callback)
                },
                function (user, callback) {
                    if (user) {
                        callback({
                            status: 400,
                            message: 'This Email is already in use'
                        });
                    } else {
                        user = new User({email: email, hashedPassword: password, username: name});
                        user.save(function (err) {
                            if (err) return callback(err);
                            callback(null, user);
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