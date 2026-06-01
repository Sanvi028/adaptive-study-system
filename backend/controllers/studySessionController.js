const StudySession = require("../models/StudySession");

const createSession = async (req, res) => {
  try {
    const { type, topic, duration, accuracy, notes } = req.body;

    const session = await StudySession.create({
      userId: req.user.id,
      type,
      topic,
      duration,
      accuracy,
      notes,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
};