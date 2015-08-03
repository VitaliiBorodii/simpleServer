var User = require('../models/user');

module.exports = function (req, res, next) {
    if (req.session.userId) {
        User.findById(req.session.userId, function (err, user) {
            if (err) return next(err);
            if (user) {
                next();
            } else {
                res.redirect('login');
            }
        });
    } else {
        res.redirect('/login');
    }
};