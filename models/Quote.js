const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "Unknown" },
});

module.exports = mongoose.model("Quote", QuoteSchema);
