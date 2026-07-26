/** @param {import('knex').Knex} knex */
exports.up = (knex) =>
  knex.schema.createTable('users', (t) => {
    t.uuid('id').primary();
    t.string('email', 255).notNullable().unique();
    t.string('username', 30).notNullable().unique();
    t.string('password_hash', 255).nullable(); // null for OAuth-only users
    t.boolean('is_email_verified').notNullable().defaultTo(false);
    t.boolean('is_locked').notNullable().defaultTo(false);
    t.timestamp('locked_until', { useTz: true }).nullable();
    t.integer('failed_login_attempts').notNullable().defaultTo(0);
    t.timestamps(true, true); // created_at, updated_at with defaults
  });

/** @param {import('knex').Knex} knex */
exports.down = (knex) => knex.schema.dropTableIfExists('users');
