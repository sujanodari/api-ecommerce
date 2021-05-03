const Joi = require('joi');

const Login = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: false });

const CreateUser = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    role: Joi.string().required(),
  })
  .options({ abortEarly: false });

module.exports = { Login, CreateUser };
