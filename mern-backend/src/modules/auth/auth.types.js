/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} username
 * @property {string} password_hash
 * @property {boolean} is_email_verified
 * @property {boolean} is_locked
 * @property {Date|null} locked_until
 * @property {number} failed_login_attempts
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} RefreshToken
 * @property {string} id
 * @property {string} user_id
 * @property {string} token_hash
 * @property {string} family_id
 * @property {Date} expires_at
 * @property {boolean} is_revoked
 * @property {string} user_agent
 * @property {string} ip_address
 * @property {Date} created_at
 */

/**
 * @typedef {Object} OAuthProfile
 * @property {string} provider
 * @property {string} providerUserId
 * @property {string} email
 * @property {string} username
 * @property {string} providerAccessToken
 * @property {string} [providerRefreshToken]
 * @property {object} profileSnapshot
 */
