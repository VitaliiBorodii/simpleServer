var User = require('../models/user');

module.exports = function (req, res, next) {
    if (req.session.userId) {
        User.findById(req.session.userId, function (err, user) {
            if (err) return next(err);
            if (user) {
                next();
            } else {
                res.redirect('/login', {login: true});
            }
        });
    } else {
        next({
            status: 401,
            message: 'Need Authorization'
        });
    }
};