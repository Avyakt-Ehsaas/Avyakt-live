const { generateSecureToken, hashToken, sanitizeUser } = require('../../src/utils/helpers');

describe('helpers', () => {
  it('generates a hex token of the correct length', () => {
    const token = generateSecureToken(32);
    expect(token).toHaveLength(64); // 32 bytes = 64 hex chars
    expect(/^[0-9a-f]+$/.test(token)).toBe(true);
  });

  it('deterministically hashes a token', () => {
    const token = 'abc123';
    expect(hashToken(token)).toBe(hashToken(token));
    expect(hashToken(token)).not.toBe(token);
  });

  it('removes password_hash from sanitized user', () => {
    const user = { id: '1', email: 'a@b.com', password_hash: 'secret' };
    const safe = sanitizeUser(user);
    expect(safe.password_hash).toBeUndefined();
    expect(safe.email).toBe('a@b.com');
  });
});
