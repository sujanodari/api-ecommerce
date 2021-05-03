const { rule } = require('graphql-shield');
const logger = require('../utils/logger')('middleware');
const { NotAuthenticatedError } = require('../utils/ApiError');
const config = require('../config');
const isSeller = rule()(async (parent, arg, context, info) => {
  return context.user.role === config.roles.admin;
});

module.exports = isSeller;
