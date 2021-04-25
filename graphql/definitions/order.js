const controller = require('../controllers/orderController')();

const typeDef = `
type Order{
  userId:Int
  name:String
  noOfOrders:Int
  averageBillValue:Int
  message:String
}

extend type Query{
  Orders: [Order]
}
`;

const resolvers = {
  Query: {
    Orders: controller.Orders,
  },
};

module.exports = {
  typeDef,
  resolvers,
};
