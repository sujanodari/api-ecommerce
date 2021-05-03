const { User } = require('../models');
const { hashPassword } = require('../services/passwordServices')();
const { ValidationError } = require('../utils/ApiError');
const { isBoolean, merge, isArray, isString, isNil, isEmpty, get } = require('lodash');

const userRepository = () => {
  /**
   *
   * @param {Object} args - The user data to be stored in database
   * @param {Object} args.query - The user data to be stored in database
   * @param {Object} args.options - The user data to be stored in database
   * Return all users from database.
   * @returns {Promise<User|null>} -null or users from database
   */
  const getAll = async (args = {}) => {
    return User.find(args.query, null, args.options);
  };

  /**
   * Create users in database.
   * @param {Object} args - The user data to be stored in database
   * @param {string} args.firstName - The user firstName to be stored in database
   * @param {string} args.lastName - The user lastName to be stored in database
   * @param {string} args.email - The user email to be stored in database
   * @param {string} args.password - The user password to be stored in database
   * @param {string} args.role - The user role to be stored in database
   * @param {string} args.address - The user address to be stored in database
   * @returns {Promise<User|null>} -null or created users from database
   */
  const createUser = (args = {}) => {
    let name = args?.name;
    let email = args?.email;
    let password = args?.password;
    let role = args?.role;

    let errors = [];

    //Required
    if (isNil(email) && (!isString(email) || isEmpty(email))) {
      errors.push('Validation: Argument Email');
    }

    if (isNil(role) && (!isString(role) || isEmpty(role))) {
      errors.push('Validation: Argument Role');
    }

    //Optional
    if (!isNil(name) && (!isString(name) || isEmpty(name))) {
      errors.push('Validation: Argument firstName');
    }
    if (!isNil(password) && (!isString(password) || isEmpty(password))) {
      errors.push('Validation: Argument Password');
    }

    if (errors.length) {
      throw new ValidationError({ message: 'User create validation error', data: errors });
    }
    return User.create(args);
  };
  /**
   * Return  users by id from  database.
   * @param {String} id - The user id
   * @returns {Promise<User|null>} -null or users filtered by id from database
   */
  const getById = (id) => {
    // Required
    if (isNil(id) || !isString(id) || isEmpty(id)) {
      throw new ValidationError({ message: 'get user by id validation error', data: ['Validation: Argument id'] });
    }
    return User.findById({ _id: id });
  };
  const findOne = (query) => {
    return User.findOne(query);
  };

  /**
   * Update users in database.
   * @param {String} id - The user id
   * @param {Object} data - The user data to be updated in database
   *  @param {string} data.name - The user name to be updated in database
   *  @param {string} data.email - The user email to be updated in database
   *  @param {string} data.password - The user password to be updated in database
   *  @param {string} data.role - The user role to be updated in database
   *  @param {boolean} data.disable - The user block/unblock to be updated in database
   * @returns {Promise<User|null>} -null or updated user from database
   */
  const updateById = async (id, data = {}) => {
    let name = data?.name;
    let email = data?.email;
    let password = data?.password;
    let role = data?.role;
    let disable = data?.disable;

    let errors = [];
    // Required
    if (isNil(id) || isEmpty(id)) {
      errors.push('Validation: Argument id');
    }

    // Optional
    if (!isNil(name) && (!isString(name) || isEmpty(name))) {
      errors.push('Validation: Argument name');
    }
    if (!isNil(email) && (!isString(email) || isEmpty(email))) {
      errors.push('Validation: Argument email');
    }
    if (!isNil(password) && (!isString(password) || isEmpty(password))) {
      errors.push('Validation: Argument password');
    }
    if (!isNil(role) && (!isString(role) || isEmpty(role))) {
      errors.push('Validation: Argument role');
    }
    if (!isNil(disable) && !isBoolean(disable)) {
      errors.push('Validation: Argument disable');
    }
    if (errors.length) {
      throw new ValidationError({ message: 'User update validation error', data: errors });
    }
    let update = {
      ...data,
    };
    if (update.password) {
      let hashedPassword = await hashPassword(data.password);
      password = hashedPassword;
    }
    const current = await User.findById({ _id: id });
    update = merge(current, {
      name,
      email,
      password,
      role,
      disable,
    });
    return User.findOneAndUpdate({ _id: id }, update, { new: true });
  };

  return {
    getAll,
    createUser,
    getById,
    findOne,
    updateById,
  };
};

module.exports = userRepository;
