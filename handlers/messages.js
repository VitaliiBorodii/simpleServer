var mongoose = require('mongoose');
var Model = require('../models/messages');
// List of documents
var list = function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    Model.find(function (err, data) {
        if (err) return next(err);
        res.send(data);
    });
};

// One document
var get = function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    try {
        var id = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
        return res.sendStatus(400);
    }

    Model.find({_id: id}, function (err, data) {
        if (err) return next(err);
        if (data) {
            res.send(data);
        } else {
            res.sendStatus(404);
        }
    })
};

// Create a document
var create = function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    var data = req.body;
    data.userId = userId;
    data.userName = req.session.userName;
    Model.create(data, function (err, data) {
        if (err) {
            next(err);
        }
        res.send(data);
    });
};

// Update document
var update = function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    try {
        var id = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
        return res.sendStatus(400);
    }

    Model.update({_id: id, userId: userId}, {$set: req.body}, function (err, numberAffected, data) {
        if (err) return next(err);

        if (numberAffected) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    })
};

// Delete document
var remove = function (req, res, next) {
    var userId = req.session.userId;
    if (!userId) {
        return res.sendStatus(401);
    }
    try {
        var id = mongoose.Types.ObjectId(req.params.id);
    } catch (e) {
        return res.sendStatus(400);
    }

    Model.remove({_id: id, userId: userId}, function (err, data) {
        if (err) return next(err);
        data ? res.send(req.params.id) : res.sendStatus(404);
    });
};

module.exports = {
    list: list,
    get: get,
    create: create,
    update: update,
    remove: remove
};