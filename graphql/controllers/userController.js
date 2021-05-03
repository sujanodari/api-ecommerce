const userService = require('../../services/userService')();
const { CreateNewAdmin, updateUser } = require('../../validation/userValidation');
const { ValidationError } = require('../../utils/ApiError');

const userController = () => {
  const Users = async (parent, args, context, info) => {
    let data = args.input || {};
    let result = await userService.getAll({
      data,
    });
    return result;
  };

  const getUserById = (parent, args, context, info) => {
    return userService.getById(args.input);
  };

  const disableUser = (parent, args, context, info) => {
    const data = args.input;
    return userService.disableUser(data._id, data);
  };

  const enableUser = (parent, args, context, info) => {
    const data = args.input;
    return userService.enableUser(data._id, data);
  };

  const editUser = (parent, args, context, info) => {
    const data = args.input;
    const { value, error } = updateUser.validate(data);
    if (error && error.details) {
      throw new ValidationError(error);
    }
    return userService.updateById(data._id, data);
  };

  return {
    Users,
    getUserById,
    enableUser,
    disableUser,
    editUser,
  };
};

module.exports = userController;
