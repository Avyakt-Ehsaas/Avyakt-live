import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    youtubeUrl: {
      type: String,
      required: true
    },

    youtubeVideoId: {
      type: String,
      required: true
    },

    thumbnail: {
      type: String, // YouTube thumbnail URL
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
