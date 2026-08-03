const brevo = require('@getbrevo/brevo');
const { config } = require('../config');
const { logger } = require('../config/logger');
const { http } = require('winston');

const brevoClient = new brevo.BrevoClient(
  {
    apiKey: config.email.brevoApiKey
  }
);

/**
 *Escape values inserted into email html
 @param {unknown} value
 @return {string}
 */

 const escapeHtml = (value) => {
 return String(value ?? '')
  .replaceAll('&','&amp')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');
 }


/**
 * Send a transactional email using Brevo API.
 *
 * @param {{
 *   to: string,
 *   subject: string,
 *   html: string,
 *   text?: string
 * }} options
 */
const sendEmail = async({to,subject,html,text}) => {

  try {
    const response = await brevoClient.transactionalEmails.sendTransacEmail({
      sender: {
        email: config.email.brevoFrom,
        name: config.email.fromName
      },
      to:[{
        email: to,
      }],
      subject,
      htmlContent:html,
      textContent: text
    })

    logger.info('Transactional email sent',{
      module: 'email',
      to:to,
      subject: subject,
      messageId: response?.messageId
    });

    return response;

  } catch (error) {
      logger.error('Brevo email sending failed', {
      module: 'email',
      to,
      subject,
      message: error.message,
      statusCode: error.statusCode,
      responseBody: error.body,
    });

    throw error;
  }
}

/**
 * Send an email verification link.
 * @param {string} to
 * @param {string} token - raw token (not hashed)
 * @param {string} username
 */
const sendVerificationEmail = async (to, token, username) => {
  console.log(to)
  console.log(username)
   const verificationUrl =
    `${config.oauth.callbackBaseUrl}` +
    `/api/${config.apiVersion}/auth/verify-email/${encodeURIComponent(token)}`;

    const safeUsername = escapeHtml(username);
    const safeUrl  = escapeHtml(verificationUrl)
    console.log(safeUsername,safeUrl)

    return sendEmail({
      to,
      subject: 'Verify your email address',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Verify your email address</h2>

        <p>Hi ${safeUsername},</p>

        <p>
          Thank you for registering live sessions with Avyakt Ehsaas.
          Click the button below to verify your email address.
        </p>

        <p>
          <a
            href="${safeUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #71AC61;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Verify email
          </a>
        </p>

        <p>This verification link expires in 24 hours.</p>

        <p>
          If the button does not work, copy and paste this URL:
        </p>

        <p>${safeUrl}</p>
      </div>
    `,
      text:
      `Hi ${username},\n\n` +
      `Verify your email address using this link:\n${verificationUrl}\n\n` +
      `This link expires in 24 hours.`,
  });
};

/**
 * Send a password reset email.
 * @param {string} to
 * @param {string} token - raw token (not hashed)
 * @param {string} username
 */
const sendPasswordResetEmail = async (to, token, username) => {
  const resetUrl =
    `${config.frontendUrl}/reset-password` +
    `?token=${encodeURIComponent(token)}`;

  const safeUsername = escapeHtml(username);
  const safeUrl = escapeHtml(resetUrl);
  
   return sendEmail({
    to,
    subject: 'Reset your password',

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your password</h2>

        <p>Hi ${safeUsername},</p>

        <p>
          We received a request to reset your password.
          Click the button below to choose a new password.
        </p>

        <p>
          <a
            href="${safeUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #71AC61;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Reset password
          </a>
        </p>

        <p>This link expires in 1 hour.</p>

        <p>
          If you did not request a password reset, you can ignore this email.
        </p>
      </div>
    `,

    text:
      `Hi ${username},\n\n` +
      `Reset your password using this link:\n${resetUrl}\n\n` +
      `This link expires in 1 hour.`,
  });
};

module.exports = { sendEmail, sendVerificationEmail, sendPasswordResetEmail };
