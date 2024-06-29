const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  coins: { type: Number, default: 0 },
  dailyStreak: { type: Number, default: 0 },
  lastQuizDate: { type: Date },
  netWorth: { type: Number, default: 0 },
  achievements: [String],
});

module.exports = mongoose.model("User", UserSchema);
