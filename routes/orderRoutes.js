const router = require('express').Router();

const orderController = require('../controllers/orderController')();

/**
 * @api {get} /orders
 * @apiName Order
 * @apiGroup Order
 * @apiPermission none
 *
 * @apiDescription
 * This route will fetch all orders
 *
 * @apiSuccess {String} message     ok
 * @apiSuccess {Boolean} success    true
 * @apiSuccess {Array} data
 *
 *
 * @apiError {String} message     error message
 * @apiError {String} success     false
 */

router.get('/', orderController.getOrders);

module.exports = router;
