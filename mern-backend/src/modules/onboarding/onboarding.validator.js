const Joi = require('joi');

const GENDERS = ['male', 'female', 'non_binary', 'prefer_not_to_say', 'other'];
const EXPERIENCES = ['never', 'beginner', 'intermediate', 'advanced'];

const onboardingSchema = Joi.object({
  user_id: Joi.string().uuid().required(),
  age: Joi.number().integer().min(13).max(120).required(),
  gender: Joi.string().valid(...GENDERS).required(),
  profession: Joi.string().trim().min(1).max(100).required(),
  city: Joi.string().trim().min(1).max(100).required(),
  state: Joi.string().trim().min(1).max(100).required(),
  meditation_experience: Joi.string().valid(...EXPERIENCES).required(),
  meditation_reason: Joi.string().trim().min(1).max(1000).required(),
});

module.exports = { onboardingSchema };
