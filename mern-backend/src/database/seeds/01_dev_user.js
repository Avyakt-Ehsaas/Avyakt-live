const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

/** @param {import('knex').Knex} knex */
exports.seed = async (knex) => {
  await knex('users').del();

  const passwordHash = await bcrypt.hash('Dev@Password123!', 12);

  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'dev@example.com',
      username: 'devuser',
      password_hash: passwordHash,
      is_email_verified: true,
      is_locked: false,
      failed_login_attempts: 0,
    },
  ]);
};
