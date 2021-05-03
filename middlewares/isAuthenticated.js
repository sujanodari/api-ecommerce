const { rule } = require('graphql-shield');
const { NotAuthenticatedError } = require('../utils/ApiError');
const isAuthenticated = rule()(async (parent, arg, context, info) => {
  return context.user !== null;
});

module.exports = isAuthenticated;
