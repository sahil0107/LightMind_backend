const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Achievement = require("../models/Achievement");

router.get("/", auth, async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user.id });
    res.json(achievements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/unlock", auth, async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const newAchievement = new Achievement({
      user: req.user.id,
      name,
      description,
      icon,
    });
    await newAchievement.save();
    res.json(newAchievement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;