const mongoose = require('mongoose');

const config = require('../config');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.add({
  noOfOrders: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model(config.models.User, userSchema);

module.exports = User;
