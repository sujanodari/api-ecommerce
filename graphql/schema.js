const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash/merge');
const { GraphQLDateTime } = require('graphql-iso-date');

const { typeDef: User, resolvers: userResolver } = require('./definitions/user');
const { typeDef: Order, resolvers: orderResolver } = require('./definitions/order');

const Query = `
  scalar DATETIME
  type Status {
    message: String
  }
  
  type Query {
    status:  Status
  }
  type Mutation {
    _empty: String
  }
  
`;

const resolvers = {
  Query: {
    status: (parent, args, ctx) => ({ message: 'OK' }),
  },
  DATETIME: GraphQLDateTime,
};

const schema = makeExecutableSchema({
  typeDefs: [Query, User, Order],
  resolvers: merge(resolvers, userResolver, orderResolver),
});

module.exports = schema;
