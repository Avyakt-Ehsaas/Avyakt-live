const { ApiError } = require('../../src/utils/ApiError');

describe('ApiError', () => {
  it('creates a 400 bad request error', () => {
    const err = ApiError.badRequest('Invalid input');
    expect(err.statusCode).toBe(400);
    expect(err.isOperational).toBe(true);
    expect(err.message).toBe('Invalid input');
  });

  it('creates a 401 unauthorized error with custom code', () => {
    const err = ApiError.unauthorized('No token', 'TOKEN_MISSING');
    expect(err.statusCode).toBe(401);
    expect(err.code).toBe('TOKEN_MISSING');
  });

  it('marks internal errors as non-operational', () => {
    const err = ApiError.internal('DB failed');
    expect(err.isOperational).toBe(false);
    expect(err.statusCode).toBe(500);
  });
});
