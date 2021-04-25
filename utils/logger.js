const winston = require('winston');
const colors = require('colors');
const util = require('util');
const isError = require('lodash/isError');
require('winston-daily-rotate-file');

const { format } = winston;
const { combine, timestamp, printf, label } = format;

const { env, log, appName } = require('../config');

const consoleFormatter = () => {
  let formatter = printf(
    (info) =>
      `${colors.grey(info.timestamp)} - ${info.name ? `${colors.magenta(info.name)} - ` : ''}${info.level}: ${
        info.message
      } ${info.data ? `\n${colors.magenta(util.format('%o', info.data))}` : ''}`
  );

  return combine(label({ label: 'label' }), timestamp(), formatter);
};

const fileFormatter = () => {
  let formatter = printf(
    (info) =>
      `${info.timestamp} - ${info.name ? `${info.name} - ` : ''}${info.level}: ${info.message} ${
        info.data ? `\n data: ${util.format('%o', info.data)}` : ''
      }
      `
  );

  return combine(
    label({ label: 'label' }),

    timestamp(),
    formatter
  );
};

const rotateFileOptions = {
  level: log.fileLogLevel,
  dirname: log.dirname,
  filename: `.${appName}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

let options = {};
if (env !== 'production') {
  options.level = log.consoleLoglevel;
  options.transports = [new winston.transports.Console()];
  options.format = consoleFormatter();
} else {
  options.level = log.fileLoglevel;
  options.transports = [
    new winston.transports.DailyRotateFile({
      ...rotateFileOptions,
      level: log.logLevels.error,
      filename: `.${log.errorLogFilename}-%DATE%.log`,
    }),
    new winston.transports.DailyRotateFile(rotateFileOptions),
  ];
  options.format = fileFormatter();
}

const loggerInstance = winston.createLogger(options);

const logger = (loggerName = '') => {
  /**
   * Winston logger
   * @param {Object} args - Logger data
   * @param {string} args.operation
   * @param {Error|Object|String} args.data - Error object or data
   * @param {string} args.level - Log level
   * @param {string} args.message - Log level
   * @returns {Logger} winston logger object
   */
  const log = (args) => {
    const operation = args?.operation || '';
    let logArgs = {
      ...args,
      name: `${loggerName}.${operation}()`,
    };

    if (isError(args.data)) {
      logArgs.data = args.data.stack;
    }

    return loggerInstance.log(logArgs);
  };

  /**
   * Error
   * @param {Object} args - log data
   * @param {string} args.message - log data
   * @param {string} args.operation - log data
   * @param {Object|Error|string} args.data - log data
   */
  const error = (args = {}) => {
    log({
      level: 'error',
      ...args,
    });
  };

  /**
   * Warn
   * @param {Object} args - log data
   * @param {string} args.message - log data
   * @param {string} args.operation - log data
   * @param {Object|Error|string} args.data - log data
   */
  const warn = (args = {}) => {
    log({
      level: 'warn',
      ...args,
    });
  };

  /**
   * Info
   * @param {Object} args - log data
   * @param {string} args.message - log data
   * @param {string} args.operation - log data
   * @param {Object|Error|string} args.data - log data
   */
  const info = (args = {}) => {
    log({
      level: 'info',
      ...args,
    });
  };

  /**
   * Verbose
   * @param {Object} args - log data
   * @param {string} args.message - log data
   * @param {string} args.operation - log data
   * @param {Object|Error|string} args.data - log data
   */
  const verbose = (args = {}) => {
    log({
      level: 'verbose',
      ...args,
    });
  };

  /**
   * Debug
   * @param {Object} args - log data
   * @param {string} args.message - log data
   * @param {string} args.operation - log data
   * @param {Object|Error|string} args.data - log data
   */
  const debug = (args = {}) => {
    log({
      level: 'debug',
      ...args,
    });
  };

  /**
   * Silly
   * @param {Object} args - log data
   * @param {string} args.message - log data
   * @param {string} args.operation - log data
   * @param {Object|Error|string} args.data - log data
   */
  const silly = (args = {}) => {
    log({
      level: 'error',
      ...args,
    });
  };

  return {
    error,
    warn,
    info,
    verbose,
    debug,
    silly,
  };
};

module.exports = logger;
