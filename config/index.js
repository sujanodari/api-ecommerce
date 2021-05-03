require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  appName: process.env.APP_NAME || 'ecommerce',
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE || '15m',
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || '7d',
  forgetPasswordTokenLife: process.env.FORGET_PASSWORD_TOKEN_LIFE || '30m',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'accessSecrect',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'secrect',
  forgetPasswordTokenSecret: process.env.FORGET_PASSWORD_TOKEN_SECRET || 'forgetSecrect',
  saltRounds: process.env.SALT_ROUNDS || 10,
  adminPassword: process.env.ADMIN_PASSWORD || '$2b$10$afOErA5xN6ijIskoU5dBCOajhhwrw1zz1dNQ5dMEA45ju8BygDnfe',
  adminEmail: process.env.ADMIN_Email || 'user@admin.com',
  frontendUrl: 'http://localhost:3000',
  roles: {
    admin: 'admin',
    user: 'user',
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce',
  },
  changePassword: {
    changePasswordSubject: process.env.CHANGEPASSWORD_SUBJECT || 'Change your password',
    changePasswordBody: process.env.CHANGEPASSWORD_BODY || 'Here is the link',
  },
  verificationSubject: process.env.VERIFICATION_SUBJECT || 'Verify your email',
  registration: {
    registrationBody: process.env.REGISTRATION_BODY || 'Here is the link',
  },
  verification: {
    verificationBody: process.env.VERIFICATION_BODY || 'Here is the link',
  },
  senderEmail: 'noreply@kycnepal.com.np',
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
  token: {
    tokenType: {
      refresh: 'refresh',
    },
    refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken',
  },
  models: {
    User: 'User',
    UserToken: 'UserToken',
  },
  mail: {
    email: 'odarisujan12@gmail.com',
    clientid: '667888063256-g29es14ihh2bc63rv9kdr6kqtdrvj9gg.apps.googleusercontent.com',
    clientSecret: '4Bb0yBhvLleg59rPDefQwSJd',
    access_token:
      'ya29.a0AfH6SMBY5J9az2Vv9K01yoav2gvZdrCPxG0GZ7luHlKw_e3DfbuMDoivEqINf_AT-AmpB4JtfV8VL9YCJNNAbRZhiFfXj02t5TctKdWmnD--fp9B7a9Al-_v6egcvs3dHDI0QFaWN8C1ZIhZaUHztpwLZpdg',
    scope: 'https://mail.google.com/',
    token_type: 'Bearer',
    expires_in: 3599,
    refresh_token:
      '1//04Duj38y6OWuYCgYIARAAGAQSNwF-L9IraCAHDtvabNqoTHLUSdWOAZm52A0ORxAjBMn7LTc0UJw919S5OsukLG5BBWu2mzf636M',
  },
};
