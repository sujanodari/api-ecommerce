class ApiError extends Error {
  constructor({ message, code, data }) {
    super(message);
    this.message = message || 'Internal server error';
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

class AppError extends ApiError {
  /**
   * Create a new application error. Internal Code: 4000
   * @param {Object} args - The args object
   * @param {String=} args.message - The error message
   * @param {[String]=} args.details - Error details
   */
  constructor(args) {
    super({
      message: args.message || 'Internal server error',
      code: 500,
      data: args.data || {},
    });
  }
}

class ValidationError extends ApiError {
  /**
   * Create a new validation error.
   * @param {Object} args - The args object
   * @param {string=} args.message - The error message
   * @param {any=} args.data - Error data
   */
  constructor(args) {
    super({
      message: args.message || 'Validation Error',
      code: 400,
      data: args.data || {},
    });
  }
}

class NotFoundError extends ApiError {
  /**
   * Create a new not found error.
   * @param {Object} args - The args object
   * @param {string=} args.message - The error message
   * @param {any=} args.data - Error data
   */
  constructor(args) {
    super({
      message: args.message || 'Resource not found',
      code: 404,
      data: args.data || {},
    });
  }
}

class ForbiddenError extends ApiError {
  /**
   * Create a new forbidden error.
   * @param {Object} args - The args object
   * @param {string=} args.message - The error message
   * @param {any=} args.data - Error data
   */
  constructor(args) {
    super({
      message: args.message || 'User not authorized to perform this action',
      code: 403,
      data: args.data || {},
    });
  }
}

class NotAuthenticatedError extends ApiError {
  /**
   * Create a new unauthenticated error.
   * @param {Object} args - The args object
   * @param {string=} args.message - The error message
   * @param {any=} args.data - Error data
   */
  constructor(args) {
    super({
      message: args.message || 'User not authenticated',
      code: 401,
      data: args.data || {},
    });
  }
}

class NotImplementedError extends ApiError {
  /**
   * Create a new not implemented error.
   * @param {Object} args - The args object
   * @param {string=} args.message - The error message
   * @param {any=} args.data - Error data
   */
  constructor(args) {
    super({
      message: args.message || 'Not implemented',
      code: 401,
      data: args.data || {},
    });
  }
}

class ConflictError extends ApiError {
  /**
   * Create a new not implemented error.
   * @param {Object} args - The args object
   * @param {string=} args.message - The error message
   * @param {any=} args.data - Error data
   */
  constructor(args) {
    super({
      message: args.message || 'Resource conflict',
      code: 409,
      data: args.data || {},
    });
  }
}

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  ForbiddenError,
  NotAuthenticatedError,
  NotImplementedError,
  ConflictError,
};
