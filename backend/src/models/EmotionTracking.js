import mongoose from "mongoose";

const emotionTrackingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meeting"
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Pre-meditation emotion (how they felt before session)
  preMeditationEmotion: {
    type: String,
    enum: ["stressed", "anxious", "sad", "angry", "neutral", "calm", "happy", "energized"],
    required: true
  },
  // Post-meditation emotion (how they felt after session)
  postMeditationEmotion: {
    type: String,
    enum: ["stressed", "anxious", "sad", "angry", "neutral", "calm", "happy", "energized"],
    required: true
  },
  // Overall day mood
  dayMood: {
    type: String,
    enum: ["very-bad", "bad", "neutral", "good", "very-good"],
    required: true
  },
  // Stress level (1-10 scale)
  stressLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  // Energy level (1-10 scale)
  energyLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  // Focus level (1-10 scale)
  focusLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  // Sleep quality (1-10 scale)
  sleepQuality: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  // Additional emotional context
  emotionalContext: {
    workStress: { type: Number, min: 0, max: 10, default: 0 },
    personalStress: { type: Number, min: 0, max: 10, default: 0 },
    physicalWellbeing: { type: Number, min: 0, max: 10, default: 0 },
    mentalClarity: { type: Number, min: 0, max: 10, default: 0 }
  },
  // Emotion improvement score (calculated)
  emotionImprovement: {
    type: Number,
    min: -100,
    max: 100
  },
  // Session feedback reference
  feedbackId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feedback"
  }
}, {
  timestamps: true
});

// Index for efficient queries
emotionTrackingSchema.index({ user: 1, date: -1 });
emotionTrackingSchema.index({ sessionId: 1 });

// Pre-save middleware to calculate emotion improvement
emotionTrackingSchema.pre('save', function(next) {
  if (this.preMeditationEmotion && this.postMeditationEmotion) {
    // Define emotion scores for calculation
    const emotionScores = {
      "stressed": 1,
      "anxious": 2,
      "sad": 3,
      "angry": 1,
      "neutral": 5,
      "calm": 7,
      "happy": 8,
      "energized": 9
    };
    
    const preScore = emotionScores[this.preMeditationEmotion] || 5;
    const postScore = emotionScores[this.postMeditationEmotion] || 5;
    
    // Calculate improvement percentage
    this.emotionImprovement = ((postScore - preScore) / preScore) * 100;
  }
  next();
});

const EmotionTracking = mongoose.model("EmotionTracking", emotionTrackingSchema);
export default EmotionTracking;
