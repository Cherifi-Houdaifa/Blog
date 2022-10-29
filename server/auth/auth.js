const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Author = require('../models/author');
const bcrypt = require('bcrypt');

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const user = await Author.findOne({ username });
                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }
                const validation = await bcrypt.compare(
                    password,
                    user.password
                );
                if (!validation) {
                    return done(null, false, {
                        message: 'Wrong Password LMAO',
                    });
                }
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    'jwt',
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        },
        (token, done) => {
            try {
                return done(null, token);
            } catch (error) {
                done(error);
            }
        }
    )
);
