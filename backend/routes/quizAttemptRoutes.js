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

      const isCorrect =
        question.correctAnswer === ans.selectedAnswer;

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

    // Quiz summary
    const totalQuestions = answers.length;

    const accuracy =
      totalQuestions > 0
        ? (score / totalQuestions) * 100
        : 0;

    // Save quiz attempt history
    const quizAttempt = new QuizAttempt({
      userId,
      score,
      totalQuestions,
      accuracy,
      topicsCovered: [...topicsCovered],
    });

    await quizAttempt.save();

    res.json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        score,
        totalQuestions,
        accuracy,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const attempts = await QuizAttempt.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: attempts.length,
      data: attempts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;