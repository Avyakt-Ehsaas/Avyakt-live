import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      lowercase: true // "distracted_mind"
    },
    title: {
      type: String,
      required: true,
      trim: true // "Distracted Mind"
    },
    description: {
      type: String,
      required: true,
      trim: true // Explanation shown to user
    }
  },
  { _id: false }
);

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: false // Draft by default (best practice)
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
      results: {
      type: [resultSchema],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for admin queries
surveySchema.index({ createdBy: 1 });
surveySchema.index({ isActive: 1 });

const Survey = mongoose.model("Survey", surveySchema);
export default Survey;
