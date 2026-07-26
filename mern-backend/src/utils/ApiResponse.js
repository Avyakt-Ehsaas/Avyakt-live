/**
 * Send a consistent success response.
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 */
const sendSuccess = (res, statusCode, message, data = null) => {
  const payload = {
    success: true,
    message,
    requestId: res.locals.requestId,
  };

  if (data !== null) payload.data = data;

  return res.status(statusCode).json(payload);
};

module.exports = { sendSuccess };
