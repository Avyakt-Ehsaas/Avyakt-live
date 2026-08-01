const winston = require('winston');
const { config } = require('./index');

const { combine, timestamp, json, colorize, printf, errors } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp: ts, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${ts} [${level}]: ${stack || message}${metaStr}`;
  })
);

const prodFormat = combine(timestamp(), errors({ stack: true }), json());

const transports = [];

if (config.isProduction) {
  transports.push(
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  );
} else {
  transports.push(new winston.transports.Console());
}

const logger = winston.createLogger({
  level: config.isProduction ? 'info' : 'debug',
  format: config.isProduction ? prodFormat : devFormat,
  transports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Pipe Morgan HTTP logs into Winston at 'http' level
const morganStream = {
  write: (message) => logger.http(message.trim(), { module: 'http' }),
};

module.exports = { logger, morganStream };
