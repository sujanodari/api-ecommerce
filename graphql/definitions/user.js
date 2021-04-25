const controller = require('../controllers/userController')();

const typeDef = `

extend type Mutation{
  UpdateUserOrders: Status
}
`;

const resolvers = {
  Mutation: {
    UpdateUserOrders: controller.updateOrders,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
