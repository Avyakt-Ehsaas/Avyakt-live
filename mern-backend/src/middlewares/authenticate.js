const { verifyAccessToken } = require('../services/token.service');
const { ApiError } = require('../utils/ApiError');
const { TOKEN_ERRORS } = require('../utils/constants');

/**
 * Protect routes by verifying the Bearer access token in the Authorization header.
 * Attaches req.user = { id, email, role } on success.
 */
const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('No token provided', TOKEN_ERRORS.MISSING));
  }

  const token = authHeader.slice(7);

  try {
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.sub, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticate };
