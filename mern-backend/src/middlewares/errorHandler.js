const { logger } = require('../config/logger');
const { ApiError } = require('../utils/ApiError');
const { config } = require('../config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  const requestId = res.locals.requestId;

  if (err instanceof ApiError && err.isOperational) {
    logger.warn('Operational error', {
      module: 'errorHandler',
      requestId,
      userId: req.user?.id,
      code: err.code,
      statusCode: err.statusCode,
      message: err.message,
      path: req.path,
    });

    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message },
      requestId,
    });
  }

  // Unexpected / programmer errors
  logger.error('Unhandled error', {
    module: 'errorHandler',
    requestId,
    userId: req.user?.id,
    stack: err.stack,
    message: err.message,
    path: req.path,
  });

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: config.isProduction ? 'Something went wrong' : err.message,
    },
    requestId,
  });
};

module.exports = { errorHandler };
