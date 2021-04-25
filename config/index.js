require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  appName: process.env.APP_NAME || 'ecommerce',
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce',
  },
  origins: [process.env.FE_ORIGIN_LOCAL, process.env.FE_ORIGIN_LIVE],
  log: {
    logLevels: {
      error: 'error',
      warn: 'warn',
      info: 'info',
      verbose: 'verbose',
      debug: 'debug',
      silly: 'silly',
    },
    consoleLoglevel: process.env.CONSOLE_LOG_LEVEL || 'debug',
    fileLoglevel: process.env.FILE_LOG_LEVEL || 'info',
    dirname: process.env.LOG_DIRNAME || '.logs',
    errorLogFilename: process.env.ERROR_LOG_FILENAME || 'error',
  },
  models: {
    User: 'User',
    Order: 'Order',
  },
};
