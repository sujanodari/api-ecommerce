const jwt = require('jsonwebtoken');
const tokenService = () => {
  /**
   * Generates  token
   * @param {Object} args - takes an argument payload and token secret
   * @param {object=} args.payload -takes an payload
   * @param {String=} args.tokenSecret -takes an tokenSecret
   * @param {Number=} args.tokenLife - takes an number
   * @returns {Object<payload && token >} -return payload and token
   */
  const generateToken = async (args = {}) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        args.payload,
        args.tokenSecret,
        {
          algorithm: 'HS256',
          expiresIn: args.tokenLife,
        },
        (err, token) => {
          if (err) {
            reject(err);
          }

          resolve(token);
        }
      );
    });
  };

  /**
   * Verify token
   * @param {Object} args - takes an argument payload and token secret
   * @param {string} args.token - Token
   * @param {string} args.tokenSecret - Token secret
   * @returns {Object} return decoded value
   */
  const verifyToken = (args = {}) => {
    let token = args.token;
    let tokenSecret = args.tokenSecret;
    return jwt.verify(token, tokenSecret);
  };
  return {
    generateToken,
    verifyToken,
  };
};

module.exports = tokenService;
