const knex = require('knex');
const knexConfig = require('../../knexfile');
const { config } = require('./index');
const { logger } = require('./logger');

const db = knex(knexConfig[config.env] || knexConfig.development);

/**
 * Verify the database connection on startup.
 */
async function connectDB() {
  await db.raw('SELECT 1');
  logger.info('Database connected', { module: 'database' });
}

/**
 * Close the database connection pool.
 */
async function disconnectDB() {
  await db.destroy();
  logger.info('Database disconnected', { module: 'database' });
}

module.exports = { db, connectDB, disconnectDB };
