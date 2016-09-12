const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}

exports.signin = function (req, res, next) {
  // User has allready been auth'd
  // Send token
  res.json({ token: tokenForUser(req.user) });
}

exports.signup = function (req, res, next) {
  // see if user with give email exists
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password"
    });
  }

  User.findOne({ email }, function (err, existingUser) {
    if (err) { return next(err); }

    // if exists, return error
    if (existingUser) {
      return res.status(422).send({
        error: "Email is in use"
      });
    }

    // if doesn't exists, create and save
    const newUser = new User({email, password});
    newUser.save(function (err) {
      if (err) { return next(err); }
      // respond with success
      res.json({ token: tokenForUser(newUser) });
    });
  });
}
