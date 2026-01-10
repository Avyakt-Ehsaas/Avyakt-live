import Feedback from '../models/Feedback.js';
import Meeting from '../models/MeetingModel.js';
import User from '../models/user.model.js';
import EmotionTracking from '../models/EmotionTracking.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
export const submitFeedback = async (req, res) => {
  const { 
    rating, 
    mood, 
    recommend, 
    message, 
    chips, 
    sessionId,
    // Emotion tracking fields
    preMeditationEmotion,
    postMeditationEmotion,
    dayMood,
    stressLevel,
    energyLevel,
    focusLevel,
    sleepQuality,
    emotionalContext
  } = req.body;
  const user = req.user._id;

  try {
    const feedback = await Feedback.create({
      user,
      rating,
      mood,
      recommend,
      message,
      chips,
      sessionId
    });

    // Save emotion tracking data if provided
    if (preMeditationEmotion && postMeditationEmotion) {
      try {
        await EmotionTracking.create({
          user,
          sessionId,
          feedbackId: feedback._id,
          preMeditationEmotion,
          postMeditationEmotion,
          dayMood,
          stressLevel,
          energyLevel,
          focusLevel,
          sleepQuality,
          emotionalContext
        });
      } catch (emotionError) {
        console.error('Error saving emotion tracking:', emotionError);
        // Continue with feedback response even if emotion tracking fails
      }
    }

    // Mark attendance after successful feedback submission
    if (sessionId) {
      try {
        const meeting = await Meeting.findOne({ "sessions._id": sessionId });
        if (meeting) {
          const session = meeting.sessions.id(sessionId);
          if (session) {
            // Find attendee for this user
            const attendee = session.attendees.find(a => a.user.equals(user));
            if (attendee) {
              // Mark attendance as completed
              attendee.feedbackSubmitted = true;
              attendee.feedbackSubmittedAt = new Date();
              
              // Update user's tree growth if duration meets minimum and feedback is submitted
              if (attendee.duration >= (meeting.settings?.minAttendanceDuration || 10) * 60) {
                const userDoc = await User.findById(user);
                await userDoc.updateTreeGrowth();
              }
              
              await meeting.save();
            }
          }
        }
      } catch (attendanceError) {
        console.error('Error marking attendance:', attendanceError);
        // Continue with feedback response even if attendance marking fails
      }
    }

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
};

// @desc    Get user's feedback history
// @route   GET /api/feedback/history
// @access  Private
export const getFeedbackHistory = async (req, res) => {
  const feedbacks = await Feedback.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('sessionId', 'title startTime');

  res.json({
    success: true,
    count: feedbacks.length,
    data: feedbacks
  });
};

// @desc    Get feedback statistics (admin only)
// @route   GET /api/feedback/stats
// @access  Private/Admin
export const getFeedbackStats = async (req, res) => {
  const stats = await Feedback.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalFeedback: { $sum: 1 },
        recommendCount: {
          $sum: { $cond: [{ $eq: ['$recommend', true] }, 1, 0] }
        },
        moodStats: { $push: '$mood' }
      }
    },
    {
      $project: {
        _id: 0,
        averageRating: { $round: ['$averageRating', 1] },
        totalFeedback: 1,
        recommendPercentage: {
          $multiply: [
            { $divide: ['$recommendCount', '$totalFeedback'] },
            100
          ]
        },
        moodDistribution: {
          $reduce: {
            input: ['relaxed', 'focused', 'energized', 'neutral'],
            initialValue: {},
            in: {
              $mergeObjects: [
                '$$value',
                {
                  $arrayToObject: [
                    [
                      {
                        k: '$$this',
                        v: {
                          $size: {
                            $filter: {
                              input: '$moodStats',
                              as: 'mood',
                              cond: { $eq: ['$$mood', '$$this'] }
                            }
                          }
                        }
                      }
                    ]
                  ]
                }
              ]
            }
          }
        }
      }
    }
  ]);

  // Get recent feedback with user details
  const recentFeedback = await Feedback.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .populate('sessionId', 'title');

  res.json({
    success: true,
    data: {
      ...stats[0],
      recentFeedback
    }
  });
};