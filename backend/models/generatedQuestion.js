const mongoose = require("mongoose");

const generatedQuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: "Exactly 4 options are required",
      },
    },

    correctAnswer: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
      index: true,
    },

    source: {
      type: String,
      default: "AI",
    },
  },
  { timestamps: true }
);

generatedQuestionSchema.index({
  userId: 1,
  topic: 1,
});

module.exports = mongoose.model(
  "GeneratedQuestion",
  generatedQuestionSchema
); 