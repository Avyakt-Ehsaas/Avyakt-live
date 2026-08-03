const Joi = require('joi');

const passwordRule = Joi.string()
  .min(12)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/)
  .required()
  .messages({
    'string.pattern.base':
      'Password must contain at least one uppercase, lowercase, digit, and special character',
    'string.min': 'Password must be at least 12 characters long',
  });

const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(50).required(),
  lastName: Joi.string().trim().min(1).max(50).required(),
  email: Joi.string().email().lowercase().trim().required(),
  username: Joi.string().alphanum().min(3).max(30).trim().required(),
  password: passwordRule,
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: passwordRule,
});

module.exports = { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema };
