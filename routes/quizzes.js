const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Quiz = require("../models/Quiz");
const User = require("../models/User");

// Get a random quiz for user's age group
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let ageGroup;
    if (user.age < 15) ageGroup = "under15";
    else if (user.age >= 15 && user.age <= 22) ageGroup = "15to22";
    else ageGroup = "above22";

    const quizzes = await Quiz.find({ ageGroup });
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    res.json(randomQuiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Submit quiz answers
router.post("/submit", auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    const user = await User.findById(req.user.id);

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;
    const coinsEarned = Math.floor(score * (1 + user.dailyStreak * 0.1));

    user.coins += coinsEarned;
    const today = new Date().setHours(0, 0, 0, 0);
    if (user.lastQuizDate && user.lastQuizDate.setHours(0, 0, 0, 0) === today) {
      user.dailyStreak++;
    } else {
      user.dailyStreak = 1;
    }
    user.lastQuizDate = new Date();
    await user.save();

    res.json({
      score,
      coinsEarned,
      totalCoins: user.coins,
      dailyStreak: user.dailyStreak,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
