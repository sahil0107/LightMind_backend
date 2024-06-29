const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const { getAvatarByCoins } = require("../utils/avatarUtils");

// Get a random quiz for user's age group
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const today = new Date().setHours(0, 0, 0, 0);

    // Temporarily disable the 24-hour limit for testing
    // if (user.lastQuizDate && user.lastQuizDate.setHours(0, 0, 0, 0) === today) {
    //   return res.status(400).json({ msg: "You've already taken a quiz today. Come back tomorrow!" });
    // }

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
    await user.save();  // This will trigger the pre-save hook and update the avatar

    const today = new Date().setHours(0, 0, 0, 0);
    if (user.lastQuizDate && user.lastQuizDate.setHours(0, 0, 0, 0) === today) {
      user.dailyStreak++;
    } else {
      user.dailyStreak = 1;
    }
    user.lastQuizDate = new Date();
    user.avatar = getAvatarByCoins(user.coins);
    await user.save();
    console.log(`User coins: ${user.coins}, Avatar: ${user.avatar}`);

    res.json({
      score,
      coinsEarned,
      totalCoins: user.coins,
      dailyStreak: user.dailyStreak,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
