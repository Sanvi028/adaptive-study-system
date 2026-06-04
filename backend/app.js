require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizAttemptRoutes = require("./routes/quizAttemptRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const aiTutorRoutes = require("./routes/aiTutorRoutes");


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/sessions", studySessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quiz", quizAttemptRoutes);
app.use("/api/analytics", analyticsRoutes); 
app.use("/api/recommendations",recommendationRoutes);
app.use("/api/ai",aiTutorRoutes);






//database connection
connectDB();

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});