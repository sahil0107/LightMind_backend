const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  unlockedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Achievement", AchievementSchema);