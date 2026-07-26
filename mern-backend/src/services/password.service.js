const bcrypt = require('bcryptjs');
const { config } = require('../config');

/**
 * Hash a plain-text password.
 * @param {string} plain
 * @returns {Promise<string>}
 */
const hashPassword = (plain) => bcrypt.hash(plain, config.bcrypt.rounds);

/**
 * Compare a plain-text password against a stored hash.
 * Uses constant-time comparison to prevent timing attacks.
 * @param {string} plain
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

module.exports = { hashPassword, comparePassword };
