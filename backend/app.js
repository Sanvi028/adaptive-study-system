require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/sessions", studySessionRoutes);

//database connection
connectDB();

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});