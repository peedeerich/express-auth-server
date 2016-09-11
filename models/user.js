const mongoose = require('mongoose');
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

// Create model class
const User = mongoose.model('user', userSchema);

// Export model
module.exports = User;
