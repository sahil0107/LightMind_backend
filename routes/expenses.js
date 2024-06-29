
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Expense = require("../models/Expense");
const User = require("../models/User");

// Get all expenses for a user
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add new expense or income
router.post("/", auth, async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const newExpense = new Expense({
      user: req.user.id,
      amount: parseFloat(amount),
      type,
      description,
    });
    const expense = await newExpense.save();

    // Update user's net worth
    const user = await User.findById(req.user.id);
    const amountChange = type === "income" ? parseFloat(amount) : -parseFloat(amount);
    user.netWorth = parseFloat(user.netWorth) + amountChange;
    await user.save();

    res.json({ expense, netWorth: user.netWorth });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update an expense
router.put("/:id", auth, async (req, res) => {
  const { amount, type, description } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: "Expense not found" });

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: { amount, type, description } },
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete an expense
router.delete("/:id", auth, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: "Expense not found" });

    // Make sure user owns expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Expense.findByIdAndRemove(req.params.id);

    res.json({ msg: "Expense removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get user's net worth
router.get("/net-worth", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ netWorth: parseFloat(user.netWorth).toFixed(2) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;