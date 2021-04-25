const mongoose = require('mongoose');

const config = require('../config');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
    index: true,
    required: true,
  },
  userId: {
    required: true,
    type: Number,
    ref: config.models.User,
  },
  subtotal: {
    required: true,
    type: Number,
  },
  date: {
    type: Date,
    default: true,
  },
});
const Order = mongoose.model(config.models.Order, orderSchema);

module.exports = Order;
