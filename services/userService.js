let userRepository = require('../repository/userRepository')();

const userService = () => {
  const getAll = async (args = {}) => {
    return await userRepository.getAll(args);
  };

  const findOne = (query) => {
    return userRepository.findOne(query);
  };

  const getById = (args = {}) => {
    return userRepository.getById(args?._id);
  };
  const disableUser = (id, data = {}) => {
    const query = {
      disable: true,
    };
    return userRepository.updateById(id, query);
  };

  const enableUser = (id, data = {}) => {
    const query = {
      disable: false,
    };
    return userRepository.updateById(id, query);
  };

  const updateById = (id, data = {}) => {
    return userRepository.updateById(id, data);
  };
  return {
    getAll,
    findOne,
    getById,
    disableUser,
    enableUser,
    updateById,
  };
};

module.exports = userService;
