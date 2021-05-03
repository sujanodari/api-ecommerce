const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash/merge');
const { GraphQLDateTime } = require('graphql-iso-date');

const { typeDef: User, resolvers: userResolver } = require('./definitions/user');
const { typeDef: Auth, resolvers: authResolver } = require('./definitions/Auth');

const Query = `
  scalar DATETIME
  type Status {
    message: String
  }
  
  type CreateResponse {
    _id: String!
    message: String
    token:String
  }

  input GetByIdInput{
    _id:String!
  }

  input CreateInput {
    name:String
    email: String!
    password: String
    role: String!
  }


  type Query {
    status:  Status
  }
  type Mutation {
    _empty: String
  }
  type MessageResponse {
    message: String
  }
  
`;

const resolvers = {
  Query: {
    status: (parent, args, ctx) => ({ message: 'OK' }),
  },
  DATETIME: GraphQLDateTime,
};

const schema = makeExecutableSchema({
  typeDefs: [Query, User, Auth],
  resolvers: merge(resolvers, userResolver, authResolver),
});

module.exports = schema;
