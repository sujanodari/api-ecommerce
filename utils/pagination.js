const config = require('../config');

const pagination = () => {
  const getPaginationArgs = (args = {}) => {
    let { offset = 0, limit = config.pageLimit, sort = { createdAt: 'descending' } } = args;

    return { limit, skip: offset, sort };
  };

  const getPaginationResult = (args = {}) => {
    const options = args.options;
    const total = args.count;
    const startIndex = options.skip;

    const hasNextPage = args.count > options.limit + options.skip ? true : false;
    let endIndex = options.skip + options.limit - 1;
    if (endIndex >= total) {
      endIndex = total - 1;
    }
    return {
      hasNextPage,
      endIndex,
      total,
      startIndex,
    };
  };
  return {
    getPaginationArgs,
    getPaginationResult,
  };
};
module.exports = pagination;
