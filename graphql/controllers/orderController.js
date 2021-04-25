const orderService = require('../../services/orderService')();

const orderController = () => {
  const Orders = (parent, args, context, info) => {
    return orderService.getAll(args);
  };

  return {
    Orders,
  };
};

module.exports = orderController;
