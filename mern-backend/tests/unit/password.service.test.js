const { hashPassword, comparePassword } = require('../../src/services/password.service');

// Override bcrypt rounds for speed in tests
process.env.BCRYPT_ROUNDS = '1';

describe('password.service', () => {
  it('hashes a password and verifies it correctly', async () => {
    const hash = await hashPassword('TestPassword1!');
    expect(typeof hash).toBe('string');
    expect(hash).not.toBe('TestPassword1!');
    await expect(comparePassword('TestPassword1!', hash)).resolves.toBe(true);
  });

  it('rejects a wrong password', async () => {
    const hash = await hashPassword('TestPassword1!');
    await expect(comparePassword('WrongPassword', hash)).resolves.toBe(false);
  });
});
