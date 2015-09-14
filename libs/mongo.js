var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('./config');

mongoose.connect(config.get('mongo:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    // Error handler
});
db.once('open', function callback() {
    // Connection established successfully
});

var models = {};

//Initialize all schemes
var init = function (modelsDirectory, callback) {
    //Read files from modelsDirectory
    var schemaList = fs.readdirSync(modelsDirectory);
    //Create Mongoose models and fire callback, when finished
    async.each(schemaList, function (item, cb) {
        var modelName = path.basename(item, '.js');
        models[modelName] = require(path.join(modelsDirectory, modelName))(mongoose);
        cb();
    }, callback);
};

//Return newly created models from the list ?????? ?? ??????
var model = function (modelName) {
    var name = modelName.toLowerCase();
    if (typeof models[name] == "undefined") {
        // If model not found return ERROR
        throw "Model '" + name + "' is not exist";
    }
    return models[name];
};

module.exports.init = init;
module.exports.db = db;
module.exports.model = model;