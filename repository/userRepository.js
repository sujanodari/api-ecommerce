const { User } = require('../models');
const { ValidationError } = require('../utils/ApiError');
const { isBoolean, merge, isArray, isString, isNil, isEmpty, get } = require('lodash');

const userRepository = () => {
  /**
   *
   * @param {Object} args - The user data to be updated in database
   * @param {Object} args.query - The user data to be updated in database
   * @param {Object} args.options - The options
   * Return all users from database.
   * @returns {Promise<User|null>} -null or users from database
   */
  const updateOrders = (args = {}) => {
    let bulkArr = [];

    args.query.map((user) => {
      bulkArr.push({
        updateOne: {
          filter: { userId: user.userId },
          update: { noOfOrders: user.noOfOrders },
        },
      });
    });

    return User.bulkWrite(bulkArr);
  };

  return {
    updateOrders,
  };
};

module.exports = userRepository;
