const User = require('../models/user');

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
    const newUser = new User({ email, password });
    newUser.save(function (err) {
      if (err) { return next(err); }
      // respond with success
      res.json({success: true});
    });
  });
}
