var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var logged;
    if (req.session.userId) {
        logged = true;
    }
    res.render('index', {title: 'Express', logged: logged});
});

module.exports = router;
