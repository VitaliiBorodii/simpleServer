var path = require('path');
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(path.basename(module.filename, '.js'), Schema);