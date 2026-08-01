module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/database/migrations/**', '!src/database/seeds/**'],
  coverageDirectory: 'coverage',
  verbose: true,
};
