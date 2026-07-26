const { ApiError } = require('../utils/ApiError');

/**
 * Factory that returns a middleware validating req[source] against a Joi schema.
 * @param {import('joi').Schema} schema
 * @param {'body'|'query'|'params'} [source='body']
 */
const validate = (schema, source = 'body') => (req, _res, next) => {
  const { error, value } = schema.validate(req[source], { abortEarly: false, stripUnknown: true });

  if (error) {
    const details = error.details.map((d) => d.message).join('; ');
    return next(ApiError.badRequest(`Validation error: ${details}`, 'VALIDATION_ERROR'));
  }

  req[source] = value;
  next();
};

module.exports = { validate };
