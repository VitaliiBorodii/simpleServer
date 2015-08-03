var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.destroy(function(err, sucess) {
        if (err) return next(err);
        res.redirect('/')
    });
});

module.exports = router;