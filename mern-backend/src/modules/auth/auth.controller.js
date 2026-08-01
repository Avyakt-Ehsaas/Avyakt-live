const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const authUsecase = require('./auth.usecase');
const { sendSuccess } = require('../../utils/ApiResponse');
const { asyncWrapper } = require('../../utils/asyncWrapper');
const { config } = require('../../config');

const REFRESH_COOKIE = 'refreshToken';

const cookieOptions = {
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

const clearCookieOptions = { httpOnly: true, secure: config.isProduction, sameSite: 'strict' };

const getMeta = (req) => ({
  ip: req.ip,
  userAgent: req.headers['user-agent'],
});

// POST /register
const register = asyncWrapper(async (req, res) => {
  const user = await authUsecase.register(req.body);
  sendSuccess(res, 201, 'Registration successful. Please check your email to verify your account.', { user });
});

// POST /login
const login = asyncWrapper(async (req, res) => {
  const { user, accessToken, refreshToken } = await authUsecase.login(req.body, getMeta(req));
  res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions);
  sendSuccess(res, 200, 'Login successful', { user, accessToken });
});

// POST /logout
const logout = asyncWrapper(async (req, res) => {
  const refreshToken = req.cookies[REFRESH_COOKIE];
  const accessToken = req.headers.authorization?.slice(7);
  await authUsecase.logout(refreshToken, accessToken);
  res.clearCookie(REFRESH_COOKIE, clearCookieOptions);
  sendSuccess(res, 200, 'Logged out successfully');
});

// POST /refresh-token
const refreshToken = asyncWrapper(async (req, res) => {
  const token = req.cookies[REFRESH_COOKIE];
  if (!token) {
    const { ApiError } = require('../../utils/ApiError');
    throw ApiError.unauthorized('No refresh token provided', 'TOKEN_MISSING');
  }
  const { accessToken, refreshToken: newRefresh } = await authUsecase.refreshTokens(token, getMeta(req));
  res.cookie(REFRESH_COOKIE, newRefresh, cookieOptions);
  sendSuccess(res, 200, 'Tokens refreshed', { accessToken });
});

// POST /forgot-password
const forgotPassword = asyncWrapper(async (req, res) => {
  await authUsecase.forgotPassword(req.body.email);
  // Always same response to avoid email enumeration
  sendSuccess(res, 200, 'If that email is registered, you will receive a reset link shortly.');
});

// POST /reset-password
const resetPassword = asyncWrapper(async (req, res) => {
  await authUsecase.resetPassword(req.body);
  sendSuccess(res, 200, 'Password has been reset successfully. Please log in again.');
});

// GET /verify-email/:token
const verifyEmail = asyncWrapper(async (req, res) => {
  await authUsecase.verifyEmail(req.params.token);
  sendSuccess(res, 200, 'Email verified successfully. You can now log in.');
});

// GET /me  (protected)
const getMe = asyncWrapper(async (req, res) => {
  const user = await authUsecase.getMe(req.user.id);
  sendSuccess(res, 200, 'User fetched', { user });
});

// GET /oauth/:provider
const oauthRedirect = (req, res, next) => {
  const { provider } = req.params;
  const scopeMap = { google: ['profile', 'email'], github: ['user:email'] };
  passport.authenticate(provider, { scope: scopeMap[provider] || [] })(req, res, next);
};

// GET /oauth/:provider/callback
const oauthCallback = (req, res, next) => {
  const { provider } = req.params;

  passport.authenticate(provider, { session: false }, async (err, user) => {
    if (err || !user) {
      return res.redirect(`/auth/error?message=${encodeURIComponent('OAuth authentication failed')}`);
    }

    try {
      const { accessToken, refreshToken } = await authUsecase.issueTokenPair(user.id, uuidv4(), getMeta(req));
      res.cookie(REFRESH_COOKIE, refreshToken, cookieOptions);
      // Redirect frontend with access token in fragment (never in query string)
      res.redirect(
  `${config.frontendUrl}/auth/callback#token=${encodeURIComponent(accessToken)}`);
    } catch (callbackErr) {
      next(callbackErr);
    }
  })(req, res, next);
};

module.exports = { register, login, logout, refreshToken, forgotPassword, resetPassword, verifyEmail, getMe, oauthRedirect, oauthCallback };
