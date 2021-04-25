const userRepository = require('../repository/userRepository')();
const logger = require('../utils/logger')('user');
const { NotFoundError } = require('../utils/ApiError');
const orderRepository = require('../repository/orderRepository')();

const userService = () => {
  const updateOrders = async (args = {}) => {
    const orders = await orderRepository.getAll(args);
    let userOrder = orders.map((order) => {
      return { userId: order.userId, noOfOrders: order.noOfOrders };
    });

    if (!orders.length) {
      logger.info({ operation: 'Get order', message: 'Orders not found' });
      throw new NotFoundError({ message: 'Orders not found' });
    } else {
      try {
        return userRepository.updateOrders({ query: userOrder });
      } catch (err) {
        throw new AppError({ message: 'Users orders cannot be updated' });
      }
    }
  };

  return {
    updateOrders,
  };
};

module.exports = userService;
