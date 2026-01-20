import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
      index: true
    },

    // Registered user (nullable)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // Anonymous user email (optional)
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null
    },

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true
        },
        answer: {
          type: mongoose.Schema.Types.Mixed, // allows text, number, array (for multi)
          required: true
        }
      }
    ],
       result: {
      key: String,        
      title: String,      
      description: String,
      score: Number       
    },
      scoreMap: {
      type: Map,
      of: Number
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate submissions from same user (optional)
responseSchema.index({ survey: 1, user: 1 }, { unique: false });
responseSchema.index({ survey: 1, email: 1 });

const SurveyResponse = mongoose.model("SurveyResponse", responseSchema);
export default SurveyResponse;
