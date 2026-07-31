require('dotenv').config();

const { app } = require('./app');
const { config } = require('./config');
const { logger } = require('./config/logger');
const { connectDB, disconnectDB } = require('./config/database');

const server = app.listen(config.port, async () => {
  try {
    await connectDB();
    logger.info(`Server running on port ${config.port}`, {
      module: 'server',
      env: config.env,
      port: config.port,
    });
  } catch (err) {
    logger.error('Failed to connect to database on startup', { module: 'server', error: err.message });
    process.exit(1);
  }
});

// ─── Graceful Shutdown ────────────────────────────────────────────────────────

const shutdown = async (signal) => {
  logger.info(`${signal} received — shutting down gracefully`, { module: 'server' });

  server.close(async () => {
    try {
      await disconnectDB();
      logger.info('Server closed', { module: 'server' });
      process.exit(0);
    } catch (err) {
      logger.error('Error during shutdown', { module: 'server', error: err.message });
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds if connections don't close
  setTimeout(() => {
    logger.error('Forced shutdown after timeout', { module: 'server' });
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', { module: 'server', error: err.message, stack: err.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', { module: 'server', reason: String(reason) });
  process.exit(1);
});
