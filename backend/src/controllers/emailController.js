// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for password reset
export const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const url = "https://api.brevo.com/v3/smtp/email";

    // Import User model to interact with database
    const User = (await import('../models/user.model.js')).default;

    // Find user and generate OTP
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate and store OTP in database
    const otp = user.setPasswordResetOTP();
    await user.save({ validateBeforeSave: false });

    console.log(`Password Reset OTP for ${email}: ${otp}`); // For development

    const emailData = {
      sender: {
        name: "Avyakt Ehsaas",
        email: "avyaktehsaas1@gmail.com"
      },
      to: [{ email }],
      subject: "Password Reset OTP - Avyakt Ehsaas",
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Avyakt Ehsaas</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Password Reset Request</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
              <h2 style="color: #333; margin-top: 0;">Your Password Reset OTP</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.5;">
                You requested to reset your password. Use the OTP below to proceed:
              </p>
              
              <div style="background: white; border: 2px dashed #667eea; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${otp}</span>
              </div>
              
              <p style="color: #666; font-size: 14px;">
                <strong>Important:</strong>
              </p>
              <ul style="color: #666; font-size: 14px; padding-left: 20px;">
                <li>This OTP will expire in <strong>10 minutes</strong></li>
                <li>Do not share this OTP with anyone</li>
                <li>If you didn't request this, please ignore this email</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 10px;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Need help? Contact us at <a href="mailto:support@avyaktehsaas.com" style="color: #667eea;">support@avyaktehsaas.com</a>
              </p>
            </div>
          </body>
        </html>
      `
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();

    if (response.ok) {
      res.status(200).json({
        success: true,
        message: "Password reset OTP sent successfully",
        // In production, don't return the OTP. This is just for demo
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
        expiresIn: "10 minutes"
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to send password reset OTP",
        error: result
      });
    }

  } catch (error) {
    console.error("Password Reset OTP Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Failed to send password reset OTP"
    });
  }
};

// Verify OTP for password reset
export const verifyPasswordResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    // Import User model to interact with database
    const User = (await import('../models/user.model.js')).default;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Verify OTP using database method
    const isValidOTP = user.verifyPasswordResetOTP(otp);

    if (isValidOTP) {
      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        verified: true
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid or expired OTP"
      });
    }

  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Failed to verify OTP"
    });
  }
};


export const sendEmail = async (req, res) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const url = "https://api.brevo.com/v3/smtp/email";

    const { email, emails, subject, htmlContent } = req.body;

    // 1 Normalize emails
    let allEmails = [];

    if (Array.isArray(emails) && emails.length > 0) {
      allEmails = emails;
    } else if (email) {
      allEmails = [email];
    } else {
      return res.status(400).json({
        success: false,
        message: "No email or emails array provided"
      });
    }

    // Import User model to fetch user data
    const User = (await import('../models/user.model.js')).default;

    // 2 Fetch user data for personalization
    const users = await User.find({ email: { $in: allEmails } });
    const userMap = new Map();
    users.forEach(user => {
      userMap.set(user.email, user.name || user.firstName || user.email.split('@')[0] || 'User');
    });

    // 3 Batch helper
    const BATCH_SIZE = 50;
    const batches = [];

    for (let i = 0; i < allEmails.length; i += BATCH_SIZE) {
      batches.push(allEmails.slice(i, i + BATCH_SIZE));
    }

    // 4 Results tracking
    const results = {
      totalEmails: allEmails.length,
      totalBatches: batches.length,
      successBatches: 0,
      failedBatches: 0,
      errors: []
    };

    // 5 Send batches sequentially with personalization
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];

      // Send personalized emails one by one for better personalization
      for (const email of batch) {
        try {
          // Get user name for personalization
          const userName = userMap.get(email) || 'User';
          
          // Replace {{name}} placeholder with actual user name
          const personalizedContent = htmlContent.replace(/\{\{name\}\}/g, userName);
          
          const emailData = {
            sender: {
              name: "Avyakt Ehsaas",
              email: "avyaktehsaas1@gmail.com"
            },
            to: [{ email }],
            subject: subject || "Welcome to Avyakt Ehsaas",
            htmlContent: personalizedContent
          };

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey
            },
            body: JSON.stringify(emailData)
          });

          const result = await response.json();

          if (!response.ok) {
            results.failedBatches++;
            results.errors.push({
              email,
              error: result
            });
          } else {
            results.successBatches++;
          }

          // Small delay to be extra safe (rate limit)
          await new Promise(resolve => setTimeout(resolve, 300));

        } catch (err) {
          results.failedBatches++;
          results.errors.push({
            email,
            error: err.message
          });
        }
      }
    }

    // 6 Final response
    res.status(200).json({
      success: results.failedBatches === 0,
      message:
        results.failedBatches === 0
          ? "All emails sent successfully"
          : "Some email batches failed",
      report: results
    });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Failed to send Email"
    });
  }
};