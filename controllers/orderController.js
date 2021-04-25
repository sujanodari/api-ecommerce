const orderService = require('../services/orderService')();
const orderController = () => {
  const getOrders = async (req, res) => {
    try {
      const data = await orderService.getAll();
      return res.status(200).send({
        message: 'OK',
        success: true,
        data: data,
      });
    } catch (err) {
      return res.status(404).send({
        message: err.message,
        success: false,
      });
    }
  };

  return {
    getOrders,
  };
};

module.exports = orderController;
