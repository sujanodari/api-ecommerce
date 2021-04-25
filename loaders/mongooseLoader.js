const mongoose = require('mongoose');

const config = require('../config');

const logger = require('../utils/logger')('mongooseLoader');

/**
 * Connection for mongoose
 */
module.exports = function mongooseConnection() {
  const operation = 'mongooseConnection';
  const connection = config.mongo.url;

  mongoose.Promise = global.Promise;
  mongoose.connect(connection, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  mongoose.connection
    .once('open', () => {
      logger.info({ operation, message: 'Database connected' });
    })
    .on('error', (err) => {
      logger.info({ operation, message: 'Error connecting to the MongoDB', data: err });
    });
};
