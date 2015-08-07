var express = require('express');
var router = express.Router();
var handlers = require('../libs/crudHandlers')('messages');

router.get('/', function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    handlers.list(req, res, next);
});

router.put('/:id', function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    req.middle = {
        conditions: {
            userId: userId
        }
    };
    handlers.update(req, res, next);
});

module.exports = router;
