const config = require('../');

const userData = [
  {
    name: 'admin',
    email: config.adminEmail,
    password: config.adminPassword,
    role: config.roles.admin,
  },
];

module.exports = { userData };
