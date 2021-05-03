const mongoose = require('mongoose');

const config = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  disable: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model(config.models.User, userSchema);

module.exports = User;
