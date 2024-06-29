const mongoose = require("mongoose");
const { getAvatarByCoins } = require("../utils/avatarUtils");

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
  avatar: { type: String, default: "avatar1.jpeg" },
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('coins')) {
    this.avatar = getAvatarByCoins(this.coins);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
