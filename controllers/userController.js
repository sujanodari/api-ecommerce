const userService = require('../services/userService')();
const userController = () => {
  const getOrders = async (req, res) => {
    try {
      await userService.updateOrders(req);
      return res.status(200).send({
        message: 'Successfully updated',
        success: true,
      });
    } catch (err) {
      return res.status(494).send({
        message: err.message,
        success: false,
      });
    }
  };

  return {
    getOrders,
  };
};

module.exports = userController;
