const { Router } = require('express');
const { config } = require('../config');
const { authRouter } = require('./auth.routes');

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: config.env, timestamp: new Date().toISOString() });
});

router.use('/auth', authRouter);

module.exports = { rootRouter: router };
