import mongoose from "mongoose";

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
