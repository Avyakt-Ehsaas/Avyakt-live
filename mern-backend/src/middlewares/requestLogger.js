const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const { morganStream } = require('../config/logger');

// Attach a unique requestId to every incoming request
const attachRequestId = (req, res, next) => {
  const requestId = uuidv4();
  res.locals.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);
  next();
};

// Morgan HTTP log format (concise, includes requestId via custom token)
morgan.token('request-id', (_req, res) => res.locals.requestId);

const httpLogger = morgan(':request-id :method :url :status :res[content-length] - :response-time ms', {
  stream: morganStream,
});

module.exports = { attachRequestId, httpLogger };
