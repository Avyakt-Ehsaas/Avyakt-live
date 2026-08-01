const { db } = require('../../config/database');

// ─── Users ────────────────────────────────────────────────────────────────────

/** @param {string} email */
const findUserByEmail = (email) => db('users').where({ email }).first();

/** @param {string} id */
const findUserById = (id) => db('users').where({ id }).first();

/** @param {object} data */
const createUser = (data) => db('users').insert(data).returning('*').then((rows) => rows[0]);

/** @param {string} id @param {object} data */
const updateUser = (id, data) =>
  db('users').where({ id }).update({ ...data, updated_at: db.fn.now() }).returning('*').then((rows) => rows[0]);

/** @param {string} id */
const incrementFailedAttempts = (id) =>
  db('users').where({ id }).increment('failed_login_attempts', 1).returning('*').then((rows) => rows[0]);

/** @param {string} id */
const resetFailedAttempts = (id) =>
  db('users').where({ id }).update({ failed_login_attempts: 0, is_locked: false, locked_until: null, updated_at: db.fn.now() });

// ─── Refresh Tokens ───────────────────────────────────────────────────────────

/** @param {object} data */
const createRefreshToken = (data) => db('refresh_tokens').insert(data).returning('*').then((rows) => rows[0]);

/** @param {string} tokenHash */
const findRefreshTokenByHash = (tokenHash) => db('refresh_tokens').where({ token_hash: tokenHash }).first();

/** @param {string} tokenHash */
const revokeRefreshToken = (tokenHash) => db('refresh_tokens').where({ token_hash: tokenHash }).update({ is_revoked: true });

/** Revoke all tokens in a family (signals token theft). @param {string} familyId */
const revokeTokenFamily = (familyId) => db('refresh_tokens').where({ family_id: familyId }).update({ is_revoked: true });

/** Revoke all refresh tokens for a user (e.g., on password reset). @param {string} userId */
const revokeAllUserRefreshTokens = (userId) => db('refresh_tokens').where({ user_id: userId }).update({ is_revoked: true });

// ─── Email Verification Tokens ────────────────────────────────────────────────

/** @param {object} data */
const createEmailVerificationToken = (data) => db('email_verification_tokens').insert(data);

/** @param {string} tokenHash */
const findEmailVerificationToken = (tokenHash) =>
  db('email_verification_tokens').where({ token_hash: tokenHash }).whereNull('used_at').first();

/** @param {string} tokenHash */
const markEmailVerificationTokenUsed = (tokenHash) =>
  db('email_verification_tokens').where({ token_hash: tokenHash }).update({ used_at: db.fn.now() });

// ─── Password Reset Tokens ────────────────────────────────────────────────────

/** @param {object} data */
const createPasswordResetToken = (data) => db('password_reset_tokens').insert(data);

/** @param {string} tokenHash */
const findPasswordResetToken = (tokenHash) =>
  db('password_reset_tokens').where({ token_hash: tokenHash }).whereNull('used_at').first();

/** @param {string} tokenHash */
const markPasswordResetTokenUsed = (tokenHash) =>
  db('password_reset_tokens').where({ token_hash: tokenHash }).update({ used_at: db.fn.now() });

// ─── OAuth Providers ──────────────────────────────────────────────────────────

/** @param {string} provider @param {string} providerUserId */
const findOAuthProvider = (provider, providerUserId) =>
  db('oauth_providers').where({ provider, provider_user_id: providerUserId }).first();

/** @param {object} data */
const createOAuthProvider = (data) => db('oauth_providers').insert(data);

/** @param {string} userId @param {string} provider @param {object} data */
const upsertOAuthProvider = (userId, provider, data) =>
  db('oauth_providers')
    .insert({ user_id: userId, provider, ...data })
    .onConflict(['user_id', 'provider'])
    .merge({ ...data, updated_at: db.fn.now() });

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  incrementFailedAttempts,
  resetFailedAttempts,
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
  revokeTokenFamily,
  revokeAllUserRefreshTokens,
  createEmailVerificationToken,
  findEmailVerificationToken,
  markEmailVerificationTokenUsed,
  createPasswordResetToken,
  findPasswordResetToken,
  markPasswordResetTokenUsed,
  findOAuthProvider,
  createOAuthProvider,
  upsertOAuthProvider,
};
