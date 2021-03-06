const { ApolloServer } = require('apollo-server-express');

const graphqlService = require('../services/graphqlService');
const { env } = require('../config');
const { middleware } = require('../middlewares/permission');
const { applyMiddleware } = require('graphql-middleware');

/**
 * Graphql server
 */
module.exports = async ({ app, schema }) => {
  const apollo = new ApolloServer({
    schema: applyMiddleware(schema, middleware),
    playground: env === 'production' ? false : true,
    formatError: graphqlService.formatError,
    context: graphqlService.setContext,
  });
  apollo.applyMiddleware({ app, path: '/v1/graphql', cors: false });
};
