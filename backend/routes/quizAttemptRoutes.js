const express = require("express");
const router = express.Router();

const UserPerformance = require("../models/UserPerformance");
const Question = require("../models/Questions");
const QuizAttempt = require("../models/QuizAttempt");

// SUBMIT QUIZ ATTEMPT
router.post("/submit", async (req, res) => {
  try {
    const { userId, answers } = req.body;
    let score = 0;
    let topicsCovered = new Set();
    // answers = [{ questionId, selectedAnswer }]

    for (let ans of answers) {
      const question = await Question.findById(ans.questionId);

      if (!question) continue;

      const topic = question.topic;
      topicsCovered.add(topic); 
      const isCorrect = question.correctAnswer === ans.selectedAnswer;

      let performance = await UserPerformance.findOne({
        userId,
        topic,
      });

      if (!performance) {
        performance = new UserPerformance({
          userId,
          topic,
          totalAttempted: 0,
          correct: 0,
          incorrect: 0,
        });
      }

      performance.totalAttempted += 1;

            if (isCorrect) {
            score++;
            performance.correct += 1;
        } else {
            performance.incorrect += 1;
        }

      performance.accuracy =
        (performance.correct / performance.totalAttempted) * 100;

      performance.lastAttemptedAt = new Date();

      await performance.save();
    }

    res.json({
      success: true,
      message: "Quiz attempt recorded and performance updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;