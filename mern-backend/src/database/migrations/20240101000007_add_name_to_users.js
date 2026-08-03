/** @param {import('knex').Knex} knex */
exports.up = (knex) =>
  knex.schema.alterTable('users', (t) => {
    t.string('first_name', 50).nullable();
    t.string('last_name', 50).nullable();
  });

/** @param {import('knex').Knex} knex */
exports.down = (knex) =>
  knex.schema.alterTable('users', (t) => {
    t.dropColumn('first_name');
    t.dropColumn('last_name');
  });
