var mongoose = require('../libs/mongo');

var modelName = 'users';
var handlers = require('../libs/crudHandlers')(modelName);

module.exports = handlers;