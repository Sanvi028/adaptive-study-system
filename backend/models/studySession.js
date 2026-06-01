const mongoose = require("mongoose");

const StudySessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
        type: String,
        enum: ["study", "revision", "practice"],
        required: true,
    },


    topic: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number, // minutes
      required: true,
    },

    accuracy: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudySession", StudySessionSchema);