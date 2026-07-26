const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { ApiError } = require('../utils/ApiError');
const { TOKEN_ERRORS } = require('../utils/constants');

// In-memory blocklist for revoked access tokens (keyed by jti, value = expiry timestamp).
// In a real production environment with multiple instances, replace this with Redis.
const accessTokenBlocklist = new Map();

// Periodic cleanup to avoid unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [jti, expiry] of accessTokenBlocklist) {
    if (expiry < now) accessTokenBlocklist.delete(jti);
  }
}, 5 * 60 * 1000);

/**
 * Sign a short-lived JWT access token.
 * @param {{ id: string, email: string, role?: string }} payload
 * @returns {string}
 */
const signAccessToken = (payload) => {
  return jwt.sign(
    { sub: payload.id, email: payload.email, role: payload.role || 'user' },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiry, jwtid: require('uuid').v4() }
  );
};

/**
 * Sign a refresh token (longer-lived, stored hash in DB).
 * @param {{ id: string, familyId: string }} payload
 * @returns {string}
 */
const signRefreshToken = (payload) => {
  return jwt.sign(
    { sub: payload.id, familyId: payload.familyId },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiry, jwtid: require('uuid').v4() }
  );
};

/**
 * Verify an access token. Throws ApiError on failure.
 * @param {string} token
 * @returns {object} decoded payload
 */
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret);

    if (accessTokenBlocklist.has(decoded.jti)) {
      throw ApiError.unauthorized('Token has been revoked', TOKEN_ERRORS.REVOKED);
    }

    return decoded;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Access token expired', TOKEN_ERRORS.EXPIRED);
    }
    throw ApiError.unauthorized('Invalid access token', TOKEN_ERRORS.INVALID);
  }
};

/**
 * Verify a refresh token. Throws ApiError on failure.
 * @param {string} token
 * @returns {object} decoded payload
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Refresh token expired', TOKEN_ERRORS.EXPIRED);
    }
    throw ApiError.unauthorized('Invalid refresh token', TOKEN_ERRORS.INVALID);
  }
};

/**
 * Add an access token's jti to the blocklist so it can't be reused after logout.
 * @param {string} jti
 * @param {number} expiryTimestamp - unix ms
 */
const blockAccessToken = (jti, expiryTimestamp) => {
  accessTokenBlocklist.set(jti, expiryTimestamp);
};

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, blockAccessToken };
