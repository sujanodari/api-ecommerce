const ms = require('ms');

const config = require('../../config');
const tokenService = require('../../services/tokenServices')();
const authServices = require('../../services/authServices')();
const userTokenService = require('../../services/userTokenService')();

const { ForbiddenError, NotAuthenticatedError, ValidationError } = require('../../utils/ApiError');
const logger = require('../../utils/logger')();
const { CreateUser, Login } = require('../../validation/authValidation');
const authController = () => {
  const login = async (parent, args, context, info) => {
    const data = {
      email: args.input.email,
      password: args.input.password,
    };

    const options = {
      maxAge: ms(config.refreshTokenLife),
      httpOnly: true,
    };
    //Validate
    const { value, error } = Login.validate(data);
    if (error && error.details) {
      throw new ValidationError(error);
    }
    const user = await authServices.login(data);
    context.res.cookie(config.token.refreshTokenCookieName, user?.refreshToken, options);
    return user;
  };

  const createUser = (parent, arg, context, info) => {
    const data = arg.input;
    const { value, error } = CreateUser.validate(data);
    if (error && error.details) {
      throw new ValidationError(error);
    }
    return authServices.createUser(data);
  };

  const getById = (id) => {
    return authServices.getById(id);
  };

  const changePassword = (parent, args, context, info) => {
    const data = args.input;
    return authServices.changePassword(data);
  };

  const forgotPassword = async (parent, args, context, info) => {
    const data = args.input;
    const token = await authServices.forgotPassword(data);
    return {
      token: token,
      message: 'Check your Email',
    };
  };

  const resetPassword = async (parent, args, context, info) => {
    const data = args.input;
    try {
      await authServices.resetPassword(data);
      return {
        message: 'Sucessful Password Reset',
      };
    } catch (err) {
      throw new NotAuthenticatedError({
        message: 'Token is not authorized',
        data: err,
      });
    }
  };

  const removeUserRefreshToken = async (parent, args, context, info) => {
    if (args?.input?.userId !== context?.user?._id) {
      throw new ForbiddenError({
        message: 'User not authorized',
        data: args,
      });
    }

    const input = {
      ...args.input,
      tokenType: config.token.tokenType.refresh,
    };

    return userTokenService.deleteByUserId(input);
  };

  const resendVerification = (parent, args, context, info) => {
    return authServices.resendVerification(args.input);
  };

  const verifyEmail = async (parent, args, context, info) => {
    let operation = 'verifyEmail';
    const data = args.input;
    try {
      let result = await authServices.verifyEmail(data);
      return result;
    } catch (err) {
      logger.error({ message: err, data: err });
      return {
        message: err,
      };
    }
  };

  const getLoggedInUser = async (parent, args, context, info) => {
    return await authServices.getLoggedInUser(context.user?._id);
  };

  const logout = async (parent, args, context, info) => {
    let refreshToken = context.req.cookies[config.token.refreshTokenCookieName];
    if (!refreshToken) {
      if (!args?.refreshToken) {
        return false;
      } else {
        refreshToken = args.refreshToken;
      }
    }
    return userTokenService.deleteByToken(refreshToken).then((data) => (data ? true : false));
  };
  return {
    login,
    createUser,
    getById,
    changePassword,
    forgotPassword,
    resetPassword,
    removeUserRefreshToken,
    resendVerification,
    verifyEmail,
    getLoggedInUser,
    logout,
  };
};
module.exports = authController;
