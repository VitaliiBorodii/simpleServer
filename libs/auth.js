var User = require('../models/user');

module.exports = function (req, res, next) {
    if (req.session.user) {
        User.findById(req.session,user, function (err, user) {
            if (err) return next(err);
            debugger
            res.render('user', {name: user.getValue('username')})
        })
    } else {
        res.render('login');
    }
    next();
};