var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var logged,
        title = 'Home page';
    if (req.session.userId) {
        logged = true;
        title = req.session.userName + ' - Home page';
    }
    res.render('index', {title: title, logged: logged});
});

module.exports = router;
