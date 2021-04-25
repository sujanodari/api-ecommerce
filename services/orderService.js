const orderRepository = require('../repository/orderRepository')();
const logger = require('../utils/logger')('order');
const { NotFoundError } = require('../utils/ApiError');

const orderService = () => {
  const getAll = async (args = {}) => {
    const orders = await orderRepository.getAll(args);
    orders.map((order) => {
      delete order._id;
    });
    if (!orders.length) {
      logger.info({ operation: 'Get order', message: 'Orders not found' });
      throw new NotFoundError({ message: 'Orders not found' });
    }
    return orders;
  };

  return {
    getAll,
  };
};

module.exports = orderService;
