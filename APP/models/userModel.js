const mongoose = require('mongoose');
const validator = require('validator');

// name, email. photo, password, passswordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name🙏']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
    required: [true, 'Please provide your email']
  },
  photo: String,
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Please provide a password']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password']
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
