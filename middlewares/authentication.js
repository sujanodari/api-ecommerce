const { rule } = require('graphql-shield');
const { NotAuthenticatedError } = require('../utils/ApiError');
const Authentication = rule()(async (parent, arg, context, info) => {
  if (arg.input._id == context.user._id) {
    return true;
  } else {
    throw new NotAuthenticatedError({ message: 'You are not authorized' });
  }
});

module.exports = Authentication;
