const { Router } = require('express');
const controller = require('../modules/onboarding/onboarding.controller');
const { validate } = require('../middlewares/validate');
const { authLimiter } = require('../middlewares/rateLimiter');
const { onboardingSchema } = require('../modules/onboarding/onboarding.validator');

const router = Router();

router.use(authLimiter);

router.post('/', validate(onboardingSchema), controller.saveProfile);
router.get('/:userId', controller.getProfile);

module.exports = { onboardingRouter: router };
