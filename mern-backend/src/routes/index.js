const { Router } = require('express');
const { config } = require('../config');
const { authRouter } = require('./auth.routes');
const { onboardingRouter } = require('./onboarding.routes');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: config.env, timestamp: new Date().toISOString() });
});

router.use('/auth', authRouter);
router.use('/onboarding', onboardingRouter);

module.exports = { rootRouter: router };
