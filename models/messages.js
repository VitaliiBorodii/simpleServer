var path = require('path');
var mongoose = require('mongoose');
var prod = process.env.NODE_ENV === "production";
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
if (prod) {
    Schema.set('autoIndex', false);
}
module.exports = mongoose.model(path.basename(module.filename, '.js'), Schema);