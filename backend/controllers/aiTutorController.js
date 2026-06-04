const UserPerformance = require("../models/UserPerformance");

exports.generateQuestions = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    // 1. Get user performance
    const performance = await UserPerformance.find({ userId });

    if (!performance.length) {
      return res.status(404).json({ message: "No performance data found" });
    }

    // 2. Extract weak topics (simple logic for now)
    const weakTopics = performance
      .filter(p => p.accuracy < 50)
      .map(p => p.topic);

    if (!weakTopics.length) {
      return res.json({
        message: "No weak topics found. User is performing well."
      });
    }

    // 3. Pick top weak topic
    const topic = weakTopics[0];

    // 4. Generate mock AI questions based on topic
    const generatedQuestions = [
      {
        topic,
        difficulty: "easy",
        questionText: `Basic question on ${topic}?`,
        options: [
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        correctAnswer: "Option A",
        explanation: `This is a basic explanation for ${topic}`
      },
      {
        topic,
        difficulty: "medium",
        questionText: `Intermediate question on ${topic}?`,
        options: [
          "Option A",
          "Option B",
          "Option C",
          "Option D"
        ],
        correctAnswer: "Option B",
        explanation: `This is a medium explanation for ${topic}`
      }
    ];

    return res.status(200).json({
      topicSelected: topic,
      questions: generatedQuestions
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};