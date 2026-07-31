/** @param {import('knex').Knex} knex */
exports.up = (knex) =>
  knex.schema.createTable('email_verification_tokens', (t) => {
    t.uuid('id').primary();
    t.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.string('token_hash', 64).notNullable().unique();
    t.timestamp('expires_at', { useTz: true }).notNullable();
    t.timestamp('used_at', { useTz: true }).nullable();
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });

/** @param {import('knex').Knex} knex */
exports.down = (knex) => knex.schema.dropTableIfExists('email_verification_tokens');
