const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  // console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (err.status === 401) next(boom.unauthorized());
  if (err.status === 403) next(boom.forbidden());

  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  // eslint-disable-line
  console.log(err);
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
