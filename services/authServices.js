const { NotFoundError, NotAuthenticatedError, ConflictError, ValidationError } = require('../utils/ApiError');
const { generateToken, verifyToken } = require('../services/tokenServices')();
const config = require('../config');
const { comparePassword, hashPassword } = require('./passwordServices')();
const userService = require('./userService');
const userRepository = require('../repository/userRepository')();
const emailService = require('./emailService')();
const logger = require('../utils/logger')('auth');
const userTokenService = require('./userTokenService')();
const { accessTokenSecret } = require('../config');

const authServices = () => {
  const login = async (data = {}) => {
    let operation = 'login';
    let { email, password } = data;
    let query = { email: email };
    let userData = await userRepository.findOne(query);

    if (userData) {
      if (userData.disable) {
        logger.error({ operation: operation, message: 'You are disable' });
        throw new NotAuthenticatedError({ message: 'You are disable' });
      }
      let compare = await comparePassword(password, userData?.password);
      if (compare) {
        let payload = {
          _id: userData._id,
          role: userData.role,
        };

        // Create access token
        let accessTokenData = {
          payload: payload,
          tokenSecret: config.accessTokenSecret,
          tokenLife: config.accessTokenLife,
        };
        let token = await generateToken(accessTokenData);
        // Create refresh token
        let refreshTokenData = {
          payload: payload,
          tokenSecret: config.refreshTokenSecret,
          tokenLife: config.refreshTokenLife,
          user: userData._id,
        };
        let userRefreshToken = await userTokenService.createToken(refreshTokenData);
        logger.info({ operation: operation, message: 'Login sucess' });

        return {
          _id: userData._id,
          accessToken: token,
          role: userData.role,
          refreshToken: userRefreshToken.token,
        };
      } else {
        logger.error({ operation: operation, message: 'Password does not match' });
        throw new NotAuthenticatedError({ message: 'Login credentials does not match' });
      }
    } else {
      logger.error({ operation: operation, message: 'User does not exist' });
      throw new NotFoundError({ message: 'Login credentials does not match' });
    }
  };

  const getById = async (id) => {
    return await userRepository.getById(id);
  };

  const changePassword = async (data) => {
    let operation;
    let user = await userRepository.getById(data._id);
    let compare = await comparePassword(data.oldPassword, user.password);
    if (compare) {
      logger.info({ operation: operation, message: 'Password Change Sucessfully' });
      return await userRepository.updateById(data._id, { password: data.newPassword });
    } else {
      throw new ValidationError({ message: 'You enter the wrong old password' });
    }
  };

  const forgotPassword = async (data) => {
    try {
      let user = await userRepository.findOne({ email: data.email });
      let baseUrl;
      baseUrl = config.frontendUrl + '/reset-password/?token=';
      const mailSubject = config.changePassword.changePasswordSubject;
      const mailBody = config.changePassword.changePasswordBody;
      await emailService.sendEmail({ data, baseUrl, mailSubject, mailBody });
      return true;
    } catch (err) {
      throw new ValidationError({ message: 'Email does not exit in system' });
    }
  };

  const resetPassword = async (data) => {
    try {
      const tokenData = {
        token: data.token,
        tokenSecret: accessTokenSecret,
      };
      const tokenResult = verifyToken(tokenData);
      let user = await userRepository.getById(tokenResult._id);
      return userRepository.updateById(user._id, { password: data.newPassword });
    } catch (err) {
      logger.error({ operation: 'resetPassword', message: err });
      throw new ValidationError({ message: err });
    }
  };

  const getLoggedInUser = async (data) => {
    let operation = 'getLoggedInUser';
    try {
      logger.info({ operation: operation, message: 'getLoggedInUser success ' });
      return await userRepository.getById(data);
    } catch (err) {
      logger.error({ operation: operation, message: 'getLoggedInUser error', data: err });
      throw new NotAuthenticatedError({ message: 'getLoggedInUser error', data: err });
    }
  };

  const verifyEmail = async (data) => {
    const tokenData = {
      token: data.token,
      tokenSecret: accessTokenSecret,
    };
    const tokenResult = verifyToken(tokenData);
    let user = await userRepository.findOne({ email: tokenResult.email });
    if (user == null) {
      throw new NotFoundError({ message: 'User not found' });
    }
    if (!user.isEmailVerified) {
      const id = user._id;
      await userRepository.updateById(id, { isEmailVerified: true });
      return true;
    }
    return true;
  };

  const resendVerification = async (data) => {
    let user = await userRepository.findOne({ email: data.email });
    let baseUrl;
    if (user.role === config.roles.superAdmin || user.role === config.roles.admin) {
      baseUrl = config.adminUrl + '/verifyemail/';
    } else {
      baseUrl = config.frontendUrl + '/verifyemail/';
    }
    const mailSubject = config.verificationSubject;
    const mailBody = config.verification.verificationBody;
    return emailService.sendEmail({ data, baseUrl, mailSubject, mailBody });
  };

  const createUser = async (data) => {
    let operation = 'createUser';
    let res = await userRepository.findOne({ email: data.email });
    if (res) {
      logger.error({ operation: operation, message: 'Email Already Exist' });
      throw new ConflictError({ message: 'Email already exist' });
    } else {
      let user = await userRepository.createUser(data);
      let baseUrl = config.frontendUrl + '/reset-password/?token=';
      const mailSubject = config.changePassword.changePasswordSubject;
      const mailBody = config.changePassword.changePasswordBody;
      emailService.sendEmail({ data: user, baseUrl, mailSubject, mailBody });
      logger.info({ operation: operation, message: 'Registration sucess' });
      return user;
    }
  };

  return {
    login,
    getById,
    changePassword,
    forgotPassword,
    resetPassword,
    getLoggedInUser,
    verifyEmail,
    resendVerification,
    createUser,
  };
};
module.exports = authServices;
