const crypto = require('crypto');

/**
 * Generate a cryptographically secure random hex token.
 * @param {number} [bytes=32]
 * @returns {string}
 */
const generateSecureToken = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

/**
 * Hash a plain token with SHA-256 (for DB storage — not for passwords).
 * @param {string} token
 * @returns {string}
 */
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

/**
 * Strip sensitive fields from a user object before returning to client.
 * @param {object} user
 * @returns {object}
 */
const sanitizeUser = (user) => {
  const { password_hash, ...safe } = user;
  return safe;
};

/**
 * Add minutes to a Date.
 * @param {number} minutes
 * @returns {Date}
 */
const minutesFromNow = (minutes) => new Date(Date.now() + minutes * 60 * 1000);

/**
 * Add hours to a Date.
 * @param {number} hours
 * @returns {Date}
 */
const hoursFromNow = (hours) => new Date(Date.now() + hours * 60 * 60 * 1000);

/**
 * Add days to a Date.
 * @param {number} days
 * @returns {Date}
 */
const daysFromNow = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

module.exports = { generateSecureToken, hashToken, sanitizeUser, minutesFromNow, hoursFromNow, daysFromNow };
