var mongoose = require('mongoose');

module.exports = function (modelName) {
    var Model = require('../models/' + modelName);
    // List of documents
    var list = function (req, res, next) {
        var userId = req.session.userId;
        if (!userId) {
            return next({
                status: 401,
                message: 'Need Authorization'
            });
        }
        Model.find({userId: userId}, function (err, data) {
            if (err) return next(err);
            res.send(data);
        });
    };

    // One document
    var get = function (req, res, next) {
        var userId = req.session.userId;
        if (!userId) {
            return next({
                status: 401,
                message: 'Need Authorization'
            });
        }
        try{var id = mongoose.Types.ObjectId(req.params.id)}
        catch (e){res.send(400)}

        Model.find({_id: id, userId: userId}, function (err, data) {
            if (err) return next(err);
            if (data) {
                res.send(data);
            } else {
                res.send(404);
            }
        })
    };

    // Create a document
    var create = function (req, res, next) {
        var userId = req.session.userId;
        if (!userId) {
            return next({
                status: 401,
                message: 'Need Authorization'
            });
        }
        var data = req.body;
        data.userId = userId;
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
            return next({
                status: 401,
                message: 'Need Authorization'
            });
        }
        try{var id = mongoose.Types.ObjectId(req.params.id)}
        catch (e){res.send(400)}

        Model.update({_id: id, userId: userId}, {$set: req.body}, function (err, numberAffected, data) {
            if (err) return next(err);

            if (numberAffected) {
                res.send(200);
            } else {
                res.send(404);
            }

        })
    };

    // Delete document
    var remove = function (req, res, next) {
        var userId = req.session.userId;
        if (!userId) {
            return next({
                status: 401,
                message: 'Need Authorization'
            });
        }
        try{var id = mongoose.Types.ObjectId(req.params.id)}
        catch (e){res.send(400)}

        Model.remove({_id: id, userId: userId}, function (err, data) {
            if (err) return next(err);
            res.send(data ? req.params.id : 404);
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