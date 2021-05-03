const { rule, shield, and, or, not, allow, deny } = require('graphql-shield');
const isAuthenticated = require('./isAuthenticated');
const isAdmin = require('./isAdmin');
const authentication = require('./authentication');
const middleware = shield(
  {
    Mutation: {
      RemoveUserRefreshToken: isAuthenticated,
      CreateUser: and(isAuthenticated, isAdmin),
      ChangePassword: and(isAuthenticated, authentication),
      DisableUser: and(isAuthenticated, or(isAdmin, isAdmin)),
      // AssignRole: and(isAuthenticated, or(isAdmin, isAdmin)),
    },
    Query: {
      LoggedInUser: isAuthenticated,
    },
  },
  {
    allowExternalErrors: true,
  }
);

module.exports = { middleware };
