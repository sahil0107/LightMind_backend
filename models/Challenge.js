const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
