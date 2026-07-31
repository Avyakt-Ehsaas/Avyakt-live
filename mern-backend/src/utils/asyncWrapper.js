/**
 * Wraps an async route handler and forwards any thrown error to Express next().
 * Eliminates try/catch boilerplate in every controller.
 * @param {Function} fn
 */
const asyncWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncWrapper };
