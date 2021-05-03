const { Types } = require('mongoose');
const { UserToken } = require('../models');

const userTokenRepository = () => {
  /**
   * Get token by value
   * @param {string} token
   * @returns {Promise<Token|null>} - Token value or null
   */
  const getByToken = (token) => {
    return UserToken.findOne({ token });
  };

  /**
   * Create token
   * @param {Object} args - Token data
   * @param {string} args.token Token value
   * @param {string} args.user User ID
   * @param {Date} args.expiresIn Token Expiration
   * @returns {Promise<Token>} - Created Token
   */
  const createToken = (args = {}) => {
    return UserToken.create(args);
  };

  /**
   * Delete token by id
   * @param {string} id - The token id
   * @returns {Promise<Token|null>} -user or null
   */
  const deleteById = (id) => {
    return UserToken.findOneAndDelete({ _id: id });
  };

  /**
   * Delete users all token
   * @param {Object} args
   * @param {string} args.userId - User ID
   * @param {string} args.tokenType - Token type
   * @returns {Promise<true>}
   */
  const deleteByUserId = (args = {}) => {
    return UserToken.deleteMany({ user: args.userId, tokenType: args.tokenType }).then((data) =>
      data.deletedCount ? true : false
    );
  };

  /**
   * Delete token by token value
   * @param {string} id - The token id
   * @returns {Promise<Token|null>} -user or null
   */
  const deleteByToken = (token) => {
    return UserToken.findOneAndDelete({ token });
  };

  return {
    getByToken,
    createToken,
    deleteById,
    deleteByUserId,
    deleteByToken,
  };
};

module.exports = userTokenRepository;
