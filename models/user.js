var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var Schema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


Schema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('hashedPassword')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        user.salt = salt;
        // hash the password using our new salt
        bcrypt.hash(user.hashedPassword, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.hashedPassword = hash;
            next();
        });
    });
});

Schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.hashedPassword, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model(path.basename(module.filename, '.js'), Schema);