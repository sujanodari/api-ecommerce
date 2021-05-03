const get = require('lodash/get');
const { accessTokenSecret } = require('../config');
const Models = require('../models');
const tokenService = require('../services/tokenServices')();

module.exports = {
  formatError: (err) => {
    const message = err.message;
    const httpStatus = get(err, 'extensions.exception.httpStatus');
    const data = get(err, 'extensions.exception.data');
    const path = get(err, 'path');

    return {
      message,
      httpStatus,
      data,
      path,
    };
  },

  setContext: ({ req, res }) => {
    let user;
    try {
      const bearerToken = req.headers?.authorization || '';
      const [, token] = bearerToken.split(' ');

      const tokenData = {
        token,
        tokenSecret: accessTokenSecret,
      };

      user = tokenService.verifyToken(tokenData);
    } catch (err) {
      user = null;
    }
    return { req, res, Models, user };
  },
};
