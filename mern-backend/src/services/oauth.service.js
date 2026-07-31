const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { Strategy: GitHubStrategy } = require('passport-github2');
const { config } = require('../config');
const { logger } = require('../config/logger');
const { OAUTH_PROVIDERS } = require('../utils/constants');

/**
 * Configure and register Passport OAuth strategies.
 * Called once during app startup — strategies are registered only if credentials exist.
 */
const initOAuthStrategies = (authUsecase) => {
  if (config.oauth.google.clientId) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.oauth.google.clientId,
          clientSecret: config.oauth.google.clientSecret,
          callbackURL: `${config.oauth.callbackBaseUrl}/api/${config.apiVersion}/auth/oauth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const user = await authUsecase.handleOAuthCallback({
              provider: OAUTH_PROVIDERS.GOOGLE,
              providerUserId: profile.id,
              email: profile.emails?.[0]?.value,
              username: profile.displayName,
              providerAccessToken: accessToken,
              providerRefreshToken: refreshToken,
              profileSnapshot: profile._json,
            });
            done(null, user);
          } catch (err) {
            logger.error('Google OAuth error', { module: 'oauth', error: err.message });
            done(err);
          }
        }
      )
    );
  }

  if (config.oauth.github.clientId) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: config.oauth.github.clientId,
          clientSecret: config.oauth.github.clientSecret,
          callbackURL: `${config.oauth.callbackBaseUrl}/api/${config.apiVersion}/auth/oauth/github/callback`,
          scope: ['user:email'],
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const user = await authUsecase.handleOAuthCallback({
              provider: OAUTH_PROVIDERS.GITHUB,
              providerUserId: String(profile.id),
              email: profile.emails?.[0]?.value,
              username: profile.username,
              providerAccessToken: accessToken,
              providerRefreshToken: refreshToken,
              profileSnapshot: profile._json,
            });
            done(null, user);
          } catch (err) {
            logger.error('GitHub OAuth error', { module: 'oauth', error: err.message });
            done(err);
          }
        }
      )
    );
  }
};

module.exports = { initOAuthStrategies };
