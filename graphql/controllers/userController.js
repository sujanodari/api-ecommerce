const userService = require('../../services/userService')();

const userController = () => {
  const updateOrders = async (parent, args, context, info) => {
    try {
      await userService.updateOrders(args);
      return {
        message: 'User Orders updated',
      };
    } catch (err) {
      throw err;
    }
  };

  return {
    updateOrders,
  };
};

module.exports = userController;
