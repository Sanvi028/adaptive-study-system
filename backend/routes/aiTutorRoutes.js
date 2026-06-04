const express = require("express");
const router = express.Router();

const {
  generateQuestions,
} = require("../controllers/aiTutorController");

router.get("/generate", generateQuestions);

module.exports = router;