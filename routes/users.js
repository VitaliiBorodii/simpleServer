var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('user controller');
    var name;
    if ('name' in req.query) {
        name = req.query['name']
    } else {
        name = 'Anonymus';
    }
    res.render('user', { name: name });
});

module.exports = router;
