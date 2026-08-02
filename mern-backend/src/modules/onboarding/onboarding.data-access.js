const { db } = require('../../config/database');

/** @param {string} userId */
const findProfileByUserId = (userId) =>
  db('user_profiles').where({ user_id: userId }).first();

/** @param {object} data */
const createProfile = (data) =>
  db('user_profiles').insert(data).returning('*').then((rows) => rows[0]);

/** @param {string} userId @param {object} data */
const upsertProfile = (userId, data) =>
  db('user_profiles')
    .insert({ user_id: userId, ...data })
    .onConflict('user_id')
    .merge({ ...data, updated_at: db.fn.now() })
    .returning('*')
    .then((rows) => rows[0]);

module.exports = { findProfileByUserId, createProfile, upsertProfile };
