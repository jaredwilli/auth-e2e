const User = require('../models/user');

exports.signup = (req, res, next) => {
    // See if user with email exists
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send('Both email and password are required');
    }

    User.findOne({ email: email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // If email does exist return error
        if (existingUser) {
            return res.status(422).send('Email already in use');
        }

        // If email does not exist create new user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            if (err) return next(err);

            // Respond to request with success
            res.json({ success: true });
        });
    });
};
