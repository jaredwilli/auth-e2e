const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define user model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', next => {
    const user = this;

    // generate a salt, then run callback
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // hash (encrypt) password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);

            // overwrite plain text password with encrypted password
            user.password = hash;
            next(); // now save
        })
    })
});

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
