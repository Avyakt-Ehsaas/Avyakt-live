import User from '../models/user.model.js';

export const hasActivePlan = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1] || 
                   req.headers.authorization?.split('Bearer ')[1] ||
                   req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required"
      });
    }

    // Find user by token
    const user = await User.findOne({ 
      where: { 
        token: token,
        isActive: true 
      } 
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or user not found"
      });
    }

    // Check and update expired plan
    const planCheckResult = await user.checkAndUpdateExpiredPlan();
    
    if (planCheckResult.wasExpired) {
      return res.status(403).json({
        success: false,
        message: "Subscription expired",
        planStatus: 'expired',
        previousPlan: planCheckResult.previousPlan,
        expiredAt: planCheckResult.expiredAt,
        requiresSubscription: true
      });
    }

    // Check if user has active subscription
    if (!user.hasActiveSubscription()) {
      return res.status(403).json({
        success: false,
        message: "Active subscription required",
        requiresSubscription: true,
        subscriptionDetails: user.getSubscriptionStatus()
      });
    }

    // User has active plan - proceed
    req.user = user;
    next();
  } catch (error) {
    console.error('Active plan middleware error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};