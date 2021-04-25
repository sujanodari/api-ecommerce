const { Order } = require('../models');

const orderRepository = () => {
  /**
   *
   * @param {Object} args - The user order filter argument
   * @param {Object} args.query - The user order query
   * @param {Object} args.options - The user order options
   * Return all orders from database.
   * @returns {Promise<User|null>} -null or orders from database
   */
  const getAll = (args = {}) => {
    return Order.aggregate([
      {
        $group: {
          _id: '$userId',
          noOfOrders: { $sum: 1 },
          averageBillValue: { $avg: '$subtotal' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'userId',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          userId: '$user.userId',
          name: '$user.name',
          noOfOrders: '$noOfOrders',
          averageBillValue: { $floor: '$averageBillValue' },
        },
      },
      { $sort: { noOfOrders: -1 } },
    ]);
  };

  return {
    getAll,
  };
};

module.exports = orderRepository;
