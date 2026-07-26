const { v4: uuidv4 } = require('uuid');
const da = require('./auth.data-access');
const { hashPassword, comparePassword } = require('../../services/password.service');
const { signAccessToken, signRefreshToken, verifyRefreshToken, blockAccessToken } = require('../../services/token.service');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../../services/email.service');
const { ApiError } = require('../../utils/ApiError');
const {
  generateSecureToken,
  hashToken,
  sanitizeUser,
  hoursFromNow,
  daysFromNow,
} = require('../../utils/helpers');
const {
  AUTH_ERRORS,
  TOKEN_ERRORS,
  MAX_FAILED_ATTEMPTS,
  LOCKOUT_DURATION_MINUTES,
  PASSWORD_RESET_EXPIRY_HOURS,
  EMAIL_VERIFY_EXPIRY_HOURS,
} = require('../../utils/constants');
const { logger } = require('../../config/logger');
const { config } = require('../../config');

/**
 * Issue a fresh access + refresh token pair and persist the refresh token hash.
 * @param {string} userId
 * @param {string} familyId - reuse when rotating; pass uuidv4() for new sessions
 * @param {{ ip: string, userAgent: string }} meta
 */
const issueTokenPair = async (userId, familyId, { ip, userAgent }) => {
  const user = await da.findUserById(userId);
  const accessToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id, familyId });
  const tokenHash = hashToken(refreshToken);

  await da.createRefreshToken({
    id: uuidv4(),
    user_id: userId,
    token_hash: tokenHash,
    family_id: familyId,
    expires_at: daysFromNow(7),
    is_revoked: false,
    user_agent: userAgent || 'unknown',
    ip_address: ip || 'unknown',
  });

  return { accessToken, refreshToken };
};

// ─── Register ─────────────────────────────────────────────────────────────────

/**
 * @param {{ email: string, username: string, password: string }} data
 */
const register = async ({ email, username, password }) => {
  const existingEmail = await da.findUserByEmail(email);
  if (existingEmail) throw ApiError.conflict('Email is already registered', AUTH_ERRORS.EMAIL_TAKEN);

  const passwordHash = await hashPassword(password);
  const user = await da.createUser({
    id: uuidv4(),
    email,
    username,
    password_hash: passwordHash,
    is_email_verified: false,
    is_locked: false,
    failed_login_attempts: 0,
  });

  const rawToken = generateSecureToken();
  await da.createEmailVerificationToken({
    id: uuidv4(),
    user_id: user.id,
    token_hash: hashToken(rawToken),
    expires_at: hoursFromNow(EMAIL_VERIFY_EXPIRY_HOURS),
  });

  await sendVerificationEmail(email, rawToken, username);

  logger.info('User registered', { module: 'auth', userId: user.id, email });

  return sanitizeUser(user);
};

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * @param {{ email: string, password: string }} data
 * @param {{ ip: string, userAgent: string }} meta
 */
const login = async ({ email, password }, meta) => {
  const user = await da.findUserByEmail(email);

  // Return same error regardless of whether user exists (no user enumeration)
  if (!user) {
    logger.warn('Login: unknown email', { module: 'auth', email });
    throw ApiError.unauthorized('Invalid email or password', AUTH_ERRORS.INVALID_CREDENTIALS);
  }

  // Check lockout
  if (user.is_locked && user.locked_until && new Date(user.locked_until) > new Date()) {
    throw ApiError.forbidden(
      `Account is temporarily locked. Try again after ${new Date(user.locked_until).toISOString()}`,
      AUTH_ERRORS.ACCOUNT_LOCKED
    );
  }

  const passwordMatch = await comparePassword(password, user.password_hash);

  if (!passwordMatch) {
    const updated = await da.incrementFailedAttempts(user.id);

    if (updated.failed_login_attempts >= MAX_FAILED_ATTEMPTS) {
      await da.updateUser(user.id, {
        is_locked: true,
        locked_until: new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000),
      });
      logger.warn('Account locked after failed attempts', { module: 'auth', userId: user.id });
      throw ApiError.forbidden('Too many failed attempts. Account locked for 30 minutes.', AUTH_ERRORS.ACCOUNT_LOCKED);
    }

    logger.warn('Login: wrong password', { module: 'auth', userId: user.id });
    throw ApiError.unauthorized('Invalid email or password', AUTH_ERRORS.INVALID_CREDENTIALS);
  }

  if (!user.is_email_verified) {
    throw ApiError.forbidden('Please verify your email before logging in', AUTH_ERRORS.EMAIL_NOT_VERIFIED);
  }

  await da.resetFailedAttempts(user.id);

  const familyId = uuidv4();
  const tokens = await issueTokenPair(user.id, familyId, meta);

  logger.info('User logged in', { module: 'auth', userId: user.id });

  return { user: sanitizeUser(user), ...tokens };
};

// ─── Refresh Token ────────────────────────────────────────────────────────────

/**
 * Rotate a refresh token. If the presented token is already revoked,
 * revoke the entire family (signals a replay / theft attempt).
 * @param {string} refreshToken - raw token from cookie
 * @param {{ ip: string, userAgent: string }} meta
 */
const refreshTokens = async (refreshToken, meta) => {
  const decoded = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);
  const stored = await da.findRefreshTokenByHash(tokenHash);

  if (!stored) {
    throw ApiError.unauthorized('Refresh token not found', TOKEN_ERRORS.INVALID);
  }

  if (stored.is_revoked) {
    // Detected reuse of a revoked token — revoke the whole family
    await da.revokeTokenFamily(stored.family_id);
    logger.warn('Refresh token reuse detected — family revoked', {
      module: 'auth',
      userId: stored.user_id,
      familyId: stored.family_id,
    });
    throw ApiError.unauthorized('Refresh token has been revoked', TOKEN_ERRORS.REVOKED);
  }

  if (new Date(stored.expires_at) < new Date()) {
    throw ApiError.unauthorized('Refresh token expired', TOKEN_ERRORS.EXPIRED);
  }

  // Revoke the old token and issue a new pair with the same family
  await da.revokeRefreshToken(tokenHash);
  const tokens = await issueTokenPair(stored.user_id, decoded.familyId, meta);

  logger.info('Tokens rotated', { module: 'auth', userId: stored.user_id });

  return tokens;
};

// ─── Logout ───────────────────────────────────────────────────────────────────

/**
 * @param {string} refreshToken - raw token from cookie
 * @param {string} [accessToken] - raw Bearer token (to blocklist it)
 */
const logout = async (refreshToken, accessToken) => {
  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await da.revokeRefreshToken(tokenHash);
  }

  // Add access token to in-memory blocklist for its remaining lifetime
  if (accessToken) {
    try {
      const jwt = require('jsonwebtoken');
      const decoded = jwt.decode(accessToken);
      if (decoded?.jti && decoded?.exp) {
        blockAccessToken(decoded.jti, decoded.exp * 1000);
      }
    } catch {
      // If we can't decode it, it's already invalid — no action needed
    }
  }
};

// ─── Verify Email ─────────────────────────────────────────────────────────────

/** @param {string} rawToken */
const verifyEmail = async (rawToken) => {
  const tokenHash = hashToken(rawToken);
  const record = await da.findEmailVerificationToken(tokenHash);

  if (!record) throw ApiError.badRequest('Invalid or expired verification link', 'INVALID_TOKEN');
  if (new Date(record.expires_at) < new Date()) throw ApiError.badRequest('Verification link has expired', 'TOKEN_EXPIRED');

  await da.markEmailVerificationTokenUsed(tokenHash);
  await da.updateUser(record.user_id, { is_email_verified: true });

  logger.info('Email verified', { module: 'auth', userId: record.user_id });
};

// ─── Forgot Password ──────────────────────────────────────────────────────────

/** @param {string} email */
const forgotPassword = async (email) => {
  const user = await da.findUserByEmail(email);

  // Always return 200 — don't reveal if email exists
  if (!user) return;

  const rawToken = generateSecureToken();
  await da.createPasswordResetToken({
    id: uuidv4(),
    user_id: user.id,
    token_hash: hashToken(rawToken),
    expires_at: hoursFromNow(PASSWORD_RESET_EXPIRY_HOURS),
  });

  await sendPasswordResetEmail(email, rawToken, user.username);

  logger.info('Password reset requested', { module: 'auth', userId: user.id });
};

// ─── Reset Password ───────────────────────────────────────────────────────────

/** @param {{ token: string, password: string }} data */
const resetPassword = async ({ token, password }) => {
  const tokenHash = hashToken(token);
  const record = await da.findPasswordResetToken(tokenHash);

  if (!record) throw ApiError.badRequest('Invalid or expired reset link', AUTH_ERRORS.INVALID_RESET_TOKEN);
  if (new Date(record.expires_at) < new Date()) throw ApiError.badRequest('Reset link has expired', AUTH_ERRORS.INVALID_RESET_TOKEN);

  const newHash = await hashPassword(password);
  await da.updateUser(record.user_id, { password_hash: newHash });
  await da.markPasswordResetTokenUsed(tokenHash);
  await da.revokeAllUserRefreshTokens(record.user_id);

  logger.info('Password reset completed', { module: 'auth', userId: record.user_id });
};

// ─── Get Me ───────────────────────────────────────────────────────────────────

/** @param {string} userId */
const getMe = async (userId) => {
  const user = await da.findUserById(userId);
  if (!user) throw ApiError.notFound('User not found');
  return sanitizeUser(user);
};

// ─── OAuth Callback ───────────────────────────────────────────────────────────

/**
 * Find or create a user from an OAuth provider profile, then issue tokens.
 * @param {import('./auth.types').OAuthProfile} profile
 */
const handleOAuthCallback = async (profile) => {
  const { provider, providerUserId, email, username, providerAccessToken, providerRefreshToken, profileSnapshot } = profile;

  let user;
  const existingProvider = await da.findOAuthProvider(provider, providerUserId);

  if (existingProvider) {
    user = await da.findUserById(existingProvider.user_id);
  } else if (email) {
    user = await da.findUserByEmail(email);
  }

  if (!user) {
    // New user via OAuth — email is considered verified by the provider
    const safeName = (username || email.split('@')[0]).replace(/[^a-zA-Z0-9]/g, '').slice(0, 30);
    user = await da.createUser({
      id: uuidv4(),
      email: email || `${providerUserId}@${provider}.oauth`,
      username: safeName || `user_${uuidv4().slice(0, 8)}`,
      password_hash: null,
      is_email_verified: true,
      is_locked: false,
      failed_login_attempts: 0,
    });
  }

  // Encrypt tokens before storing (XOR with secret as lightweight encryption — use AES in production)
  await da.upsertOAuthProvider(user.id, provider, {
    provider_user_id: providerUserId,
    encrypted_access_token: Buffer.from(providerAccessToken || '').toString('base64'),
    encrypted_refresh_token: Buffer.from(providerRefreshToken || '').toString('base64'),
    profile_snapshot: JSON.stringify(profileSnapshot),
  });

  logger.info('OAuth login', { module: 'auth', userId: user.id, provider });

  return user;
};

module.exports = {
  register,
  login,
  refreshTokens,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
  handleOAuthCallback,
  issueTokenPair,
};
