const router = require('express').Router();

const userController = require('../controllers/userController')();

/**
 * @api {put} /users
 * @apiName User
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription
 * This route will update all noOfOrders for user
 *
 * @apiSuccess {String} message     success message
 * @apiSuccess {Boolean} success    true
 *
 *
 * @apiError {String} message     error message
 * @apiError {String} success     false
 */

router.put('/', userController.getOrders);

module.exports = router;
