import User from '../models/user.model.js';

export const checkActivePlan = async (req, res, next) => {
  try {
    // Skip authentication check for public routes
    if (req.path.includes('/auth/') || 
        req.path.includes('/surveys/ActiveSurveys') ||
        req.path.includes('/surveys/getSurvey/') ||
        req.path === '/health') {
      return next();
    }

    // Get token from multiple sources
    const token = req.headers.authorization?.split(' ')[1] || 
                   req.headers.authorization?.split('Bearer ')[1] ||
                   req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
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
    
    // Get subscription status details
    const subscriptionStatus = user.getSubscriptionStatus();
    const subscriptionIssues = [];

    if (!user.hasActiveSubscription()) {
      subscriptionIssues.push({
        type: 'inactive_subscription',
        message: 'Subscription is not active'
      });
    }

    if (!user.isActive) {
      subscriptionIssues.push({
        type: 'inactive_account',
        message: 'Account is not active'
      });
    }

    if (subscriptionStatus.plan === 'expired') {
      subscriptionIssues.push({
        type: 'expired_plan',
        message: 'Subscription has expired'
      });
    }

    // If there are subscription issues, return detailed response
    if (subscriptionIssues.length > 0 || planCheckResult.wasExpired) {
      return res.status(403).json({
        success: false,
        message: "Plan verification failed",
        issues: subscriptionIssues,
        planCheckResult: planCheckResult,
        subscriptionStatus: subscriptionStatus,
        redirectTo: subscriptionStatus.plan === 'expired' ? '/plans/renew' : '/plans/choose'
      });
    }

    // User has active plan - proceed
    req.user = user;
    next();
  } catch (error) {
    console.error('Check active plan middleware error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
