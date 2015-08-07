var express = require('express');
var router = express.Router();
var handlers = require('../libs/crudHandlers')('todos');

router.get('/', function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    req.middle = {
        conditions: {
            userId: userId
        }
    };
    handlers.list(req, res, next);
});

router.get('/:id', function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    req.middle = {
        conditions: {
            userId: userId
        }
    };
    handlers.get(req, res, next);
});

router.post('/', function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    req.body.userId = userId;
    handlers.create(req, res, next);
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

router.delete('/:id', function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    req.middle = {
        conditions: {
            userId: userId
        }
    };
    handlers.remove(req, res, next);
});

module.exports = router;