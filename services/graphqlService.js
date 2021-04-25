const get = require('lodash/get');
const Models = require('../models');

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
    return { req, res, Models };
  },
};
