const expressLoader = require("./expressLoader");
const mongooseLoader = require("./mongooseLoader");
const graphqlLoader = require("./graphqlLoader");

/**
 * Loads all the dependencies for the server
 * @param {express.Application} app - Express App
 * @param {Schema} schema - Graphql Schema
 */
module.exports = ({ app, schema }) => {
  mongooseLoader();
  expressLoader({ app });
  graphqlLoader({ app, schema });
};
