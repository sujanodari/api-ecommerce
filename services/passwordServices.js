const bcrypt = require('bcrypt');
const { AppError, NotAuthenticatedError } = require('../utils/ApiError');
const { saltRounds } = require('../config');
const logger = require('../utils/logger')('Password');

const passwordService = () => {
  /**
   * Hash Password
   * @param {string=} password - takes an argument password
   * @returns {Promise<string>} -return hash or error
   * @throws {AppError} -throw hasing error
   */
  const hashPassword = (password) => {
    try {
      const hash = bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
      logger.error({ operation: 'hashPassword', message: 'Hashing error', data: err });
      throw new AppError({ message: 'Hashing error', data: err });
    }
  };
  /**
   * Compare Password
   * @param {string=} password - takes an argument password
   * @param {string=} hash - takes an agrument password fromDb
   * @returns {Promise<boolean>} -return true or false
   * @throws {NotAuthenticatedError} -throw NotAuthenticatedError error
   */
  const comparePassword = async (password, hash) => {
    try {
      const match = await bcrypt.compare(password, hash);
      return match;
    } catch (err) {
      logger.error({ operation: 'comparePassword', message: 'Password doesnot match', data: err });
      throw new NotAuthenticatedError({ message: 'Password doesnot match', data: err });
    }
  };
  return {
    hashPassword,
    comparePassword,
  };
};

module.exports = passwordService;
