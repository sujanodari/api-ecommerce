const { origins } = require('./');

/**
 * Options for cors
 */
const getCorsOptions = () => {
  return {
    origin: (origin, callback) => {
      if (origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  };
};

module.exports = {
  getCorsOptions,
};
