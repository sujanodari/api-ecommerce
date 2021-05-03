const mongoose = require('mongoose');

const { models, token } = require('../config');

const userTokenSchema = new mongoose.Schema(
  {
    tokenType: {
      type: String,
      enum: Object.keys(token.tokenType),
      default: token.tokenType.refresh,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: models.User,
    },
    token: String,
    expiresIn: Date,
  },
  {
    timestamps: true,
  }
);

const UserToken = mongoose.model(models.UserToken, userTokenSchema);

module.exports = UserToken;
