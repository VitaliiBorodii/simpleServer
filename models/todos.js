var path = require('path');
var mongoose = require('mongoose');
var prod = process.env.NODE_ENV === "production";
var Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
});
if (prod) {
    Schema.set('autoIndex', false);
}
module.exports = mongoose.model(path.basename(module.filename, '.js'), Schema);