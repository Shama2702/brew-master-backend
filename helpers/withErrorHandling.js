const createHttpError = require("http-errors");

const withErrorHandling = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((error) =>
    next(createHttpError(500, error.message))
  );
};

module.exports = withErrorHandling;
