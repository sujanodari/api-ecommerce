const ms = require('ms');

const { refreshTokenSecret, accessTokenSecret, accessTokenLife, token: tokenConfig } = require('../config');
const userTokenRepository = require('../repository/userTokenRepository')();
const tokenService = require('./tokenServices')();
const { ValidationError } = require('../utils/ApiError');
const logger = require('../utils/logger')('userTokenService');

/**
 * User Token Service
 * @param {Function} userRepository
 */
const userTokenService = () => {
  /**
   * Get token by value
   * @param {string} token
   * @returns {Promise<Token|null>} - Token value or null
   */
  const getByToken = (token) => {
    return userTokenRepository.getByToken(token);
  };

  /**
   * Create token
   * @param {Object} args
   * @param {string} args.token
   * @param {string} args.user
   * @param {Date} args.expiresIn
   * @param {string} args.tokenType
   * @returns {Promise<Token>} - Created Token
   */
  const createToken = async (args = {}) => {
    if (!args.payload) {
      throw new ValidationError({ message: 'Payload is required' });
    }

    if (!args.user) {
      throw new ValidationError({ message: 'UserId is required' });
    }

    const token = await tokenService.generateToken({
      payload: args.payload,
      tokenSecret: args.tokenSecret,
      tokenLife: args.tokenLife,
    });

    return userTokenRepository.createToken({
      token,
      user: args.user,
      expiresIn: Date.now() + ms(args.tokenLife),
    });
  };

  /**
   * Delete token by id
   * @param {string} id - token ID
   * @returns {Promise<true}
   */
  const deleteById = (id) => {
    return userTokenRepository.deleteById(id);
  };

  /**
   * Delete users all token
   * @param {Object} args
   * @param {string} args.userId - User ID
   * @param {string} args.tokenType - Token type
   * @returns {Promise<true}
   */
  const deleteByUserId = (args = {}) => {
    const userId = args?.userId;
    const tokenType = args?.tokenType;

    if (!userId) {
      throw new ValidationError({
        message: 'UserId is missing',
        data: { userId },
      });
    }

    return userTokenRepository.deleteByUserId({
      userId: userId,
      tokenType: tokenType || tokenConfig.tokenType.refresh,
    });
  };

  /**
   * Get new access token with provided refressh token
   * @param {Object} args
   * @param {string} args.refreshToken - Refresh token
   * @returns Promise<string> New access token
   */
  const renewAccessToken = async (args = {}) => {
    const operation = 'renewAccessToken';
    const refreshToken = args?.refreshToken;
    if (!refreshToken) {
      throw new ValidationError({
        message: 'Refresh token missing',
        data: args,
      });
    }

    const foundToken = await userTokenRepository.getByToken(refreshToken);
    if (!foundToken) {
      throw new ValidationError({
        message: 'Invalid refresh token',
        data: args,
      });
    }

    try {
      // Validate refresh token
      const decoded = await tokenService.verifyToken({
        token: refreshToken,
        tokenSecret: refreshTokenSecret,
      });

      const payload = {
        _id: decoded?._id,
        role: decoded?.role,
      };

      const token = await tokenService.generateToken({
        payload: payload,
        tokenSecret: accessTokenSecret,
        tokenLife: accessTokenLife,
      });

      return {
        ...payload,
        token,
      };
    } catch (err) {
      logger.error({ operation, message: 'Error renewing access token', data: args });
      throw new ValidationError({
        message: 'Invalid refresh token',
        data: args,
      });
    }
  };

  const deleteByToken = (token) => {
    if (!token) {
      throw new ValidationError({
        message: 'Token is missing',
        data: { token },
      });
    }

    return userTokenRepository.deleteByToken(token);
  };

  return {
    getByToken,
    createToken,
    deleteById,
    deleteByUserId,
    renewAccessToken,
    deleteByToken,
  };
};

module.exports = userTokenService;
