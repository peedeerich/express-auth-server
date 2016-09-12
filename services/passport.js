const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// Create local Strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify this username and password, call done with the user
  User.findOne({ email }, function (err, existingUser) {
    if (err) { return done(err); }
    if (!existingUser) { return done(null, false); }

    // compare passwords
    existingUser.comparePassword(password, function (err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, existingUser);
    });
  });
  // call done with error if incorrect
});


// setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // payload: decoded JWT
  // done: callback to signify success

  // see if the user ID in the payload exists in our database
  // If it does, call done with that
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use Strategies
passport.use(jwtLogin);
passport.use(localLogin);
