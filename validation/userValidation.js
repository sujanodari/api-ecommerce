const Joi = require('joi');

const CreateNewUser = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    role: Joi.string().required(),
  })
  .options({ abortEarly: false });

const updateUser = Joi.object()
  .keys({
    _id: Joi.string().required(),
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string(),
  })
  .options({ abortEarly: false });

module.exports = { CreateNewUser, updateUser };
