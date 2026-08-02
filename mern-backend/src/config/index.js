const Joi = require('joi');

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  API_VERSION: Joi.string().default('v1'),

  DATABASE_URL: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().min(64).required(),
  JWT_REFRESH_SECRET: Joi.string().min(64).required(),
  JWT_ACCESS_EXPIRY: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRY: Joi.string().default('7d'),

  BCRYPT_ROUNDS: Joi.number().integer().min(10).default(12),

  ALLOWED_ORIGINS: Joi.string().required(),
  COOKIE_SECRET: Joi.string().min(64).required(),

  GOOGLE_CLIENT_ID: Joi.string().optional().allow(''),
  GOOGLE_CLIENT_SECRET: Joi.string().optional().allow(''),
  GITHUB_CLIENT_ID: Joi.string().optional().allow(''),
  GITHUB_CLIENT_SECRET: Joi.string().optional().allow(''),
  OAUTH_CALLBACK_BASE_URL: Joi.string().uri().default('http://localhost:4000'),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:5173'),

  BREVO_API_KEY: Joi.string().required(),

  BREVO_EMAIL_FROM: Joi.string()
  .email()
  .required(),

  EMAIL_FROM_NAME: Joi.string()
  .default('Avyakt Ehsaas'),

}).unknown(true);

const { error, value: env } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation failed: ${error.message}`);
}

const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  apiVersion: env.API_VERSION,
  isProduction: env.NODE_ENV === 'production',

  db: {
    url: env.DATABASE_URL,
  },

  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiry: env.JWT_ACCESS_EXPIRY,
    refreshExpiry: env.JWT_REFRESH_EXPIRY,
  },

  bcrypt: {
    rounds: env.BCRYPT_ROUNDS,
  },

  cors: {
    allowedOrigins: env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()),
  },

  cookie: {
    secret: env.COOKIE_SECRET,
  },
  
  frontendUrl: env.FRONTEND_URL,

  oauth: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    callbackBaseUrl: env.OAUTH_CALLBACK_BASE_URL,
  },

  email: {
    brevoApiKey: env.BREVO_API_KEY,
    brevoFrom: env.BREVO_EMAIL_FROM,
    fromName: env.EMAIL_FROM_NAME,
  },
};

module.exports = { config };
