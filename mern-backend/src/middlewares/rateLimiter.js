const rateLimit = require('express-rate-limit');
const { ApiError } = require('../utils/ApiError');

const rateLimitHandler = (_req, _res, next, _options) => {
  next(ApiError.tooMany('Too many requests, please try again later'));
};

// 100 requests per 15 minutes for all routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

// 10 requests per 15 minutes for auth routes (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

module.exports = { globalLimiter, authLimiter };
