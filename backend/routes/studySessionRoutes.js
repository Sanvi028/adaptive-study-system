const express = require("express");
const router = express.Router();

const { createSession } = require("../controllers/studySessionController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a study session
router.post("/", authMiddleware, createSession);

module.exports = router;