const { senderEmail } = require('../config');
const { ForbiddenError } = require('apollo-server');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const config = require('../config');
const nodemailerService = () => {
  const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      config.mail.clientid,
      config.mail.clientSecret,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: config.mail.refresh_token,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log(err);
          reject('Failed to create access token :(');
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: config.mail.email,
        accessToken,
        clientId: config.mail.clientid,
        clientSecret: config.mail.clientSecret,
        refreshToken: config.mail.refresh_token,
      },
    });

    return transporter;
  };

  const sendMail = async (data) => {
    let mailOptions = {
      from: `${senderEmail}<${config.mail.user}>`, // sender address
      to: data.email, // list of receivers
      subject: data.subject, // Subject line
      html: `${data.body} <a href=${data.baseUrl}${data.token}>Click here</a>`, // html body
    };

    let emailTransporter = await createTransporter();
    return await emailTransporter.sendMail(mailOptions);
  };

  return {
    sendMail,
  };
};

module.exports = nodemailerService;
