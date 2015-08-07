var mongoose = require('mongoose');
var _ = require('lodash');
module.exports = function (modelName) {
    var Model = require('../models/' + modelName);
    // List of documents
    var list = function (req, res, next) {
        var args = [],
            query;
        var filter = req.query.filter;
        var limit = req.query.limit || 100;
        var sort = req.query.sort;
        var callback = function (err, data) {
            if (err) return next(err);
            res.send(data);
        };
        if (req.middle && req.middle.conditions) {
            args.push(req.middle.conditions);
        }
        query = Model.find.apply(Model, args);
        if (filter) {
            _.forEach(filter, function (value, type) {
                query = query.where(type).equals(value);
            })
        }
        if (limit) {
            query = query.limit(limit);
        }
        if (sort) {
            query = query.sort(sort);
        }
        query.exec(callback);
    };

    // One document
    var get = function (req, res, next) {
        try {
            var id = mongoose.Types.ObjectId(req.params.id);
        } catch (e) {
            return res.sendStatus(400);
        }

        var conditions;
        if (req.middle && req.middle.conditions) {
            conditions = req.middle.conditions;
        } else {
            conditions = {};
        }
        conditions._id = id;
        Model.find(conditions, function (err, data) {
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
        Model.create(req.body, function (err, data) {
            if (err) {
                next(err);
            }
            res.send(data);
        });
    };

    // Update document
    var update = function (req, res, next) {
        try {
            var id = mongoose.Types.ObjectId(req.params.id);
        } catch (e) {
            return res.sendStatus(400);
        }

        var conditions;
        if (req.middle && req.middle.conditions) {
            conditions = req.middle.conditions;
        } else {
            conditions = {};
        }
        conditions._id = id;

        Model.update(conditions, {$set: req.body}, function (err, numberAffected, data) {
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
        try {
            var id = mongoose.Types.ObjectId(req.params.id);
        } catch (e) {
            return res.sendStatus(400);
        }

        var conditions;
        if (req.middle && req.middle.conditions) {
            conditions = req.middle.conditions;
        } else {
            conditions = {};
        }
        conditions._id = id;

        Model.remove(conditions, function (err, data) {
            if (err) return next(err);
            data ? res.send(req.params.id) : res.sendStatus(404);
        });
    };

    return {
        list  : list,
        get   : get,
        create: create,
        update: update,
        remove: remove
    }
};