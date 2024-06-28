const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const leaderboard = await User.find({}, "name coins")
      .sort({ coins: -1 })
      .limit(10);
    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;