const nodemailer = require('nodemailer');
const { config } = require('../config');
const { logger } = require('../config/logger');

let transporter = null;

function getTransporter() {
  if (!transporter) {
    if (!config.email.host) {
      // Fallback: log emails to console in dev when SMTP is not configured
      transporter = nodemailer.createTransport({ jsonTransport: true });
    } else {
      transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.port === 465,
        auth: { user: config.email.user, pass: config.email.pass },
      });
    }
  }
  return transporter;
}

/**
 * Send a transactional email.
 * @param {{ to: string, subject: string, html: string, text?: string }} opts
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const info = await getTransporter().sendMail({
    from: config.email.from,
    to,
    subject,
    html,
    text,
  });

  // In dev with jsonTransport, log the email instead of sending it
  if (!config.email.host) {
    logger.info('Email (dev stub)', { module: 'email', to, subject, preview: JSON.parse(info.message) });
  }
};

/**
 * Send an email verification link.
 * @param {string} to
 * @param {string} token - raw token (not hashed)
 * @param {string} username
 */
const sendVerificationEmail = async (to, token, username) => {
  const url = `${config.oauth.callbackBaseUrl}/api/${config.apiVersion}/auth/verify-email/${token}`;
  await sendEmail({
    to,
    subject: 'Verify your email address',
    html: `<p>Hi ${username},</p><p>Click <a href="${url}">here</a> to verify your email. Link expires in 24 hours.</p>`,
    text: `Hi ${username}, verify your email: ${url}`,
  });
};

/**
 * Send a password reset email.
 * @param {string} to
 * @param {string} token - raw token (not hashed)
 * @param {string} username
 */
const sendPasswordResetEmail = async (to, token, username) => {
  const url = `${config.oauth.callbackBaseUrl}/reset-password?token=${token}`;
  await sendEmail({
    to,
    subject: 'Reset your password',
    html: `<p>Hi ${username},</p><p>Click <a href="${url}">here</a> to reset your password. Link expires in 1 hour.</p><p>If you didn't request this, ignore this email.</p>`,
    text: `Hi ${username}, reset your password: ${url}`,
  });
};

module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
