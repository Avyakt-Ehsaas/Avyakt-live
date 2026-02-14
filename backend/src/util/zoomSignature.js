import jwt from 'jsonwebtoken';

/**
 * Generate Zoom Meeting Signature/JWT Token
 * @param {number} meetingNumber - Zoom meeting ID
 * @param {number} role - 0 for attendee, 1 for host
 * @returns {string} JWT token for Zoom Meeting SDK authentication
 */
const generateSignature = (meetingNumber, role) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24; // Token expires in 24 hours

  const payload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_SDK_KEY,
    tokenExp: exp,
  };
//   console.log("Generating signature with payload:", payload);
  return jwt.sign(payload, process.env.ZOOM_SDK_SECRET, {
    algorithm: 'HS256',
  });
};

export default generateSignature;