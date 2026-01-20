import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
      index: true
    },
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ["mcq", "multi", "text", "rating", "scale", "yesno", "dropdown"]
    },
    options: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
         scores: {
          type: Map,
          of: Number,
          default: {}
        }
      }
    ],
    required: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Ensure correct ordering
questionSchema.index({ survey: 1, order: 1 });

const Question = mongoose.model("Question", questionSchema);
export default Question;
