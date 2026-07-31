const { Router } = require('express');
const controller = require('../modules/auth/auth.controller');
const { validate } = require('../middlewares/validate');
const { authenticate } = require('../middlewares/authenticate');
const { authLimiter } = require('../middlewares/rateLimiter');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../modules/auth/auth.validator');

const router = Router();

router.use(authLimiter);

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post('/logout', controller.logout);
router.post('/refresh-token', controller.refreshToken);
router.post('/forgot-password', validate(forgotPasswordSchema), controller.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), controller.resetPassword);
router.get('/verify-email/:token', controller.verifyEmail);
router.get('/oauth/:provider', controller.oauthRedirect);
router.get('/oauth/:provider/callback', controller.oauthCallback);
router.get('/me', authenticate, controller.getMe);

module.exports = { authRouter: router };
