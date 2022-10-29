var express = require('express');
var router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/login', function (req, res, next) {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json(info);
        }
        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        return res.json({ token });
    })(req, res, next);
});

module.exports = router;
