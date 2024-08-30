const mongoose = require("mongoose");
//ok
const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
