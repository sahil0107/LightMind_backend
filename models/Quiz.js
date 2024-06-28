const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  ageGroup: {
    type: String,
    enum: ["under15", "15to22", "above22"],
    required: true,
  },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
});

module.exports = mongoose.model("Quiz", QuizSchema);
