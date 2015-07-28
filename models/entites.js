var path = require('path');

module.exports = function (mongoose) {

    //Refresh schema for Mongoose
    var Schema = new mongoose.Schema({
        name: { type: String, required: true }
    });

    // Initialize model with current file name
    return mongoose.model(path.basename(module.filename, '.js'), Schema);
};