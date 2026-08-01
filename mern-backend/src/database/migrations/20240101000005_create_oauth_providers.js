/** @param {import('knex').Knex} knex */
exports.up = (knex) =>
  knex.schema.createTable('oauth_providers', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.enu('provider', ['google', 'github']).notNullable();
    t.string('provider_user_id', 255).notNullable();
    // Store encrypted — never expose raw OAuth tokens to client
    t.text('encrypted_access_token').nullable();
    t.text('encrypted_refresh_token').nullable();
    t.jsonb('profile_snapshot').nullable();
    t.timestamps(true, true);

    t.unique(['user_id', 'provider']);
    t.unique(['provider', 'provider_user_id']);
  });

/** @param {import('knex').Knex} knex */
exports.down = (knex) => knex.schema.dropTableIfExists('oauth_providers');
