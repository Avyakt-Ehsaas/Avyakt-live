require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const passport = require('passport');

const { config } = require('./config');
const { attachRequestId, httpLogger } = require('./middlewares/requestLogger');
const { globalLimiter } = require('./middlewares/rateLimiter');
const { notFound } = require('./middlewares/notFound');
const { errorHandler } = require('./middlewares/errorHandler');
const { rootRouter } = require('./routes');
const { initOAuthStrategies } = require('./services/oauth.service');
const authUsecase = require('./modules/auth/auth.usecase');

const app = express();

// ─── Security Headers ─────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: config.isProduction,
    crossOriginEmbedderPolicy: config.isProduction,
  })
);
app.disable('x-powered-by'); // Belt-and-suspenders — helmet also removes this

// ─── Proxy Trust ──────────────────────────────────────────────────────────────
if (config.isProduction) app.set('trust proxy', 1);

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || config.cors.allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Request Parsing & Sanitization ──────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser(config.cookie.secret));
app.use(mongoSanitize());
app.use(hpp());

// ─── Logging ──────────────────────────────────────────────────────────────────
app.use(attachRequestId);
app.use(httpLogger);

// ─── Rate Limiting ────────────────────────────────────────────────────────────
app.use(globalLimiter);

// ─── OAuth (Passport) ─────────────────────────────────────────────────────────
app.use(passport.initialize());
initOAuthStrategies(authUsecase);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use(`/api/${config.apiVersion}`, rootRouter);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
