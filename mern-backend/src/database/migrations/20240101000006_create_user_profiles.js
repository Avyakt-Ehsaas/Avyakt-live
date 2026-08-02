/** @param {import('knex').Knex} knex */
exports.up = (knex) =>
  knex.schema.createTable('user_profiles', (t) => {
    t.uuid('id').primary();
    t.uuid('user_id').notNullable().unique().references('id').inTable('users').onDelete('CASCADE');
    t.integer('age').nullable();
    t.string('gender', 30).nullable();
    t.string('profession', 100).nullable();
    t.string('city', 100).nullable();
    t.string('state', 100).nullable();
    t.string('meditation_experience', 30).nullable();
    t.text('meditation_reason').nullable();
    t.timestamps(true, true);
  });

/** @param {import('knex').Knex} knex */
exports.down = (knex) => knex.schema.dropTableIfExists('user_profiles');
