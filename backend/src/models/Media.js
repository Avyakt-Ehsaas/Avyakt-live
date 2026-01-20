import mongoose, { mongo } from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["audio", "video"],
      required: true
    },

    // IMPORTANT: This matches surveyResponse.result.key
    resultKey: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

    mediaUrl: {
      type: String,
      required: true
    },

    backgroundImageUrl: {
      type: String // used only for audio
    },

    thumbnailUrl: String,

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);