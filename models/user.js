const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

// Define schema
const userSchema = new Schema({
  email: {
    type: String,   // JS's String object
    unique: true,
    lowercase: true
  },
  password: String
});

// on save hook, encrypt password
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function hashCallback(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if(err) {return callback(err);}
    callback(null, isMatch);
  })
}

// Create model class
const User = mongoose.model('user', userSchema);

// Export model
module.exports = User;
