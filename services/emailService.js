let userRepository = require('../repository/userRepository')();
const { generateToken } = require('./tokenServices')();
const logger = require('../utils/logger')('auth');
const { JsonWebTokenError } = require('jsonwebtoken');
const config = require('../config');
const { NotFoundError, NotAuthenticatedError, ConflictError, AppError, ValidationError } = require('../utils/ApiError');
const nodeMailerService = require('./nodeMailerService')();

const emailService = () => {
  /**
   * Send Mail
   * @param  args
   * @param {string=} data- user data or email
   * @param {string=} baseUrl-url to send email
   * @param {string=} mailSubject- subject of mail
   * @param {string=} mailBody-body of mail
   * @returns {token} token
   * @throws {NotFoundError} -throw NotFoundError error
   */

  const sendEmail = async (args = {}) => {
    let operation = 'sendEmail';
    let user = await userRepository.findOne({ email: args.data.email });
    if (user == null) {
      throw new NotFoundError({ message: 'User not found' });
    }
    let payload = {
      _id: user._id,
      role: user.role,
      email: user.email,
    };
    let token = await generateToken({
      payload,
      tokenSecret: config.accessTokenSecret,
      tokenLife: config.forgetPasswordTokenLife,
    });
    payload.token = token;
    let newData = {
      email: user.email,
      token: token,
      subject: args.mailSubject,
      body: args.mailBody,
      baseUrl: args.baseUrl,
    };
    try {
      let result = await nodeMailerService.sendMail(newData);
      logger.info({ operation: operation, message: 'Mail Send Sucessfully' });
      return token;
    } catch (err) {
      logger.error({ operation: operation, message: 'Mail send error', data: err });
      throw new AppError({ message: 'Mail send error', data: err });
    }
  };
  return {
    sendEmail,
  };
};

module.exports = emailService;
