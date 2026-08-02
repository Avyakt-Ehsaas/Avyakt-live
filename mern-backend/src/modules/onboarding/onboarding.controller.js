const { v4: uuidv4 } = require('uuid');
const da = require('./onboarding.data-access');
const authDa = require('../auth/auth.data-access');
const { sendSuccess } = require('../../utils/ApiResponse');
const { asyncWrapper } = require('../../utils/asyncWrapper');
const { ApiError } = require('../../utils/ApiError');
const { logger } = require('../../config/logger');

// POST /onboarding
const saveProfile = asyncWrapper(async (req, res) => {
  const { user_id, age, gender, profession, city, state, meditation_experience, meditation_reason } = req.body;

  const user = await authDa.findUserById(user_id);
  if (!user) throw ApiError.notFound('User not found');

  const existing = await da.findProfileByUserId(user_id);
  const profileData = { age, gender, profession, city, state, meditation_experience, meditation_reason };

  const profile = existing
    ? await da.upsertProfile(user_id, profileData)
    : await da.createProfile({ id: uuidv4(), user_id, ...profileData });

  logger.info('Onboarding profile saved', { module: 'onboarding', userId: user_id });

  sendSuccess(res, 201, 'Profile saved successfully', { profile });
});

// GET /onboarding/:userId
const getProfile = asyncWrapper(async (req, res) => {
  const profile = await da.findProfileByUserId(req.params.userId);
  sendSuccess(res, 200, 'Profile fetched', { profile: profile || null });
});

module.exports = { saveProfile, getProfile };
