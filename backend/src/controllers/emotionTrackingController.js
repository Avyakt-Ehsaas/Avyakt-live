import EmotionTracking from '../models/EmotionTracking.js';
import Feedback from '../models/Feedback.js';

// @desc    Submit emotion tracking data
// @route   POST /api/emotion-tracking
// @access  Private
export const submitEmotionTracking = async (req, res) => {
  try {
    const {
      preMeditationEmotion,
      postMeditationEmotion,
      dayMood,
      stressLevel,
      energyLevel,
      focusLevel,
      sleepQuality,
      emotionalContext,
      sessionId,
      feedbackId
    } = req.body;

    const userId = req.user._id;

    const emotionData = await EmotionTracking.create({
      user: userId,
      sessionId,
      feedbackId,
      preMeditationEmotion,
      postMeditationEmotion,
      dayMood,
      stressLevel,
      energyLevel,
      focusLevel,
      sleepQuality,
      emotionalContext
    });

    res.status(201).json({
      success: true,
      data: emotionData,
      message: "Emotion tracking data saved successfully"
    });
  } catch (error) {
    console.error('Error submitting emotion tracking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save emotion tracking data',
      error: error.message
    });
  }
};

// @desc    Get user's emotion history
// @route   GET /api/emotion-tracking/history
// @access  Private
export const getEmotionHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    const userId = req.user._id;

    // Build query
    const query = { user: userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const emotionData = await EmotionTracking.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('sessionId', 'title sessions')
      .populate('feedbackId', 'rating message');

    const total = await EmotionTracking.countDocuments(query);

    res.json({
      success: true,
      data: emotionData,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching emotion history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emotion history',
      error: error.message
    });
  }
};

// @desc    Get emotion analytics and trends
// @route   GET /api/emotion-tracking/analytics
// @access  Private
export const getEmotionAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '30' } = req.query; // Default to last 30 days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const emotionData = await EmotionTracking.find({
      user: userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    if (emotionData.length === 0) {
      return res.json({
        success: true,
        data: {
          trends: [],
          averages: {},
          improvements: []
        }
      });
    }

    // Calculate trends
    const trends = emotionData.map(data => ({
      date: data.date,
      preMeditationEmotion: data.preMeditationEmotion,
      postMeditationEmotion: data.postMeditationEmotion,
      dayMood: data.dayMood,
      stressLevel: data.stressLevel,
      energyLevel: data.energyLevel,
      focusLevel: data.focusLevel,
      sleepQuality: data.sleepQuality,
      emotionImprovement: data.emotionImprovement
    }));

    // Calculate averages
    const averages = {
      stressLevel: emotionData.reduce((sum, d) => sum + d.stressLevel, 0) / emotionData.length,
      energyLevel: emotionData.reduce((sum, d) => sum + d.energyLevel, 0) / emotionData.length,
      focusLevel: emotionData.reduce((sum, d) => sum + d.focusLevel, 0) / emotionData.length,
      sleepQuality: emotionData.reduce((sum, d) => sum + d.sleepQuality, 0) / emotionData.length,
      emotionImprovement: emotionData.reduce((sum, d) => sum + d.emotionImprovement, 0) / emotionData.length
    };

    // Emotion frequency analysis
    const preEmotionFreq = {};
    const postEmotionFreq = {};
    
    emotionData.forEach(data => {
      preEmotionFreq[data.preMeditationEmotion] = (preEmotionFreq[data.preMeditationEmotion] || 0) + 1;
      postEmotionFreq[data.postMeditationEmotion] = (postEmotionFreq[data.postMeditationEmotion] || 0) + 1;
    });

    // Day mood frequency
    const dayMoodFreq = {};
    emotionData.forEach(data => {
      dayMoodFreq[data.dayMood] = (dayMoodFreq[data.dayMood] || 0) + 1;
    });

    // Calculate improvements over time
    const improvements = emotionData
      .filter(d => d.emotionImprovement > 0)
      .map(d => ({
        date: d.date,
        improvement: d.emotionImprovement,
        preEmotion: d.preMeditationEmotion,
        postEmotion: d.postMeditationEmotion
      }));

    res.json({
      success: true,
      data: {
        trends,
        averages: {
          ...averages,
          stressLevel: Math.round(averages.stressLevel * 10) / 10,
          energyLevel: Math.round(averages.energyLevel * 10) / 10,
          focusLevel: Math.round(averages.focusLevel * 10) / 10,
          sleepQuality: Math.round(averages.sleepQuality * 10) / 10,
          emotionImprovement: Math.round(averages.emotionImprovement * 10) / 10
        },
        frequencies: {
          preMeditationEmotions: preEmotionFreq,
          postMeditationEmotions: postEmotionFreq,
          dayMoods: dayMoodFreq
        },
        improvements,
        totalSessions: emotionData.length
      }
    });
  } catch (error) {
    console.error('Error fetching emotion analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emotion analytics',
      error: error.message
    });
  }
};

// @desc    Get emotion comparison (before vs after meditation)
// @route   GET /api/emotion-tracking/comparison
// @access  Private
export const getEmotionComparison = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = '30' } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const emotionData = await EmotionTracking.find({
      user: userId,
      date: { $gte: startDate }
    });

    if (emotionData.length === 0) {
      return res.json({
        success: true,
        data: {
          beforeMeditation: {},
          afterMeditation: {},
          improvements: {}
        }
      });
    }

    // Calculate emotion distributions
    const beforeEmotions = {};
    const afterEmotions = {};

    emotionData.forEach(data => {
      beforeEmotions[data.preMeditationEmotion] = (beforeEmotions[data.preMeditationEmotion] || 0) + 1;
      afterEmotions[data.postMeditationEmotion] = (afterEmotions[data.postMeditationEmotion] || 0) + 1;
    });

    // Calculate improvement percentages
    const improvements = {};
    Object.keys(beforeEmotions).forEach(emotion => {
      const beforeCount = beforeEmotions[emotion];
      const afterCount = afterEmotions[emotion] || 0;
      improvements[emotion] = beforeCount > 0 ? ((beforeCount - afterCount) / beforeCount) * 100 : 0;
    });

    res.json({
      success: true,
      data: {
        beforeMeditation: beforeEmotions,
        afterMeditation: afterEmotions,
        improvements,
        totalSessions: emotionData.length
      }
    });
  } catch (error) {
    console.error('Error fetching emotion comparison:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emotion comparison',
      error: error.message
    });
  }
};
