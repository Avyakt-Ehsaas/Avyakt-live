/** @param {import('knex').Knex} knex */
exports.up = (knex) =>
  knex.schema.createTable('refresh_tokens', (t) => {
    t.uuid('id').primary();
    t.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.string('token_hash', 64).notNullable().unique();
    t.uuid('family_id').notNullable().index(); // groups related tokens for theft detection
    t.timestamp('expires_at', { useTz: true }).notNullable();
    t.boolean('is_revoked').notNullable().defaultTo(false);
    t.string('user_agent', 512).nullable();
    t.string('ip_address', 45).nullable(); // IPv6 max = 39 chars; 45 for safety
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });

/** @param {import('knex').Knex} knex */
exports.down = (knex) => knex.schema.dropTableIfExists('refresh_tokens');
