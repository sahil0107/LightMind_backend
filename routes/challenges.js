const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Challenge = require("../models/Challenge");
const User = require("../models/User");

// Get all challenges for a user
router.get("/", auth, async (req, res) => {
  try {
    const challenges = await Challenge.find({ user: req.user.id });
    res.json(challenges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new challenge
router.post("/", auth, async (req, res) => {
  try {
    const { title, targetAmount } = req.body;
    const newChallenge = new Challenge({
      user: req.user.id,
      title,
      targetAmount,
    });
    const challenge = await newChallenge.save();
    res.json(challenge);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update challenge progress
router.put("/:id", auth, async (req, res) => {
  try {
    const { amount } = req.body;
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found" });
    }
    if (challenge.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    challenge.currentAmount += amount;
    if (challenge.currentAmount >= challenge.targetAmount) {
      challenge.completed = true;
    }
    await challenge.save();
    res.json(challenge);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found" });
    }
    if (challenge.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await challenge.deleteOne(); // Use deleteOne() instead of remove()
    res.json({ msg: "Challenge removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Round off expense and add to challenge
router.post("/round-off", auth, async (req, res) => {
  try {
    const { expenseAmount, challengeId } = req.body;
    const roundedAmount = Math.ceil(expenseAmount);
    const difference = roundedAmount - expenseAmount;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found" });
    }
    if (challenge.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    challenge.currentAmount += difference;
    if (challenge.currentAmount >= challenge.targetAmount) {
      challenge.completed = true;
    }
    await challenge.save();

    const user = await User.findById(req.user.id);
    user.netWorth -= difference;
    await user.save();

    res.json({ challenge, netWorth: user.netWorth });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

