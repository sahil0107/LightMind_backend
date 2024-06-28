const mongoose = require("mongoose");
const Quiz = require("./models/Quiz");
const Quote = require("./models/Quote");
require("dotenv").config();

const quizzes = [
  {
    ageGroup: "under15",
    questions: [
      {
        question: "What is a budget?",
        options: [
          "A type of candy",
          "A plan for spending and saving money",
          "A kind of toy",
          "A musical instrument",
        ],
        correctAnswer: 1,
      },
      // Add more questions...
    ],
  },
  {
    ageGroup: "15to22",
    questions: [
      {
        question: "What is compound interest?",
        options: [
          "Interest on the principal only",
          "Interest on both the principal and accumulated interest",
          "A type of bank account",
          "A government tax",
        ],
        correctAnswer: 1,
      },
      // Add more questions...
    ],
  },
  {
    ageGroup: "above22",
    questions: [
      {
        question: "What is diversification in investing?",
        options: [
          "Putting all your money in one stock",
          "Spreading investments across various assets",
          "Investing only in real estate",
          "Keeping all your money in a savings account",
        ],
        correctAnswer: 1,
      },
      // Add more questions...
    ],
  },
];

const quotes = [
  {
    text: "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought, and so broadens the mind.",
    author: "T.T. Munger",
  },
  {
    text: "Do not save what is left after spending; instead spend what is left after saving.",
    author: "Warren Buffett",
  },
  {
    text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. You can't win until you do this.",
    author: "Dave Ramsey",
  },
  {
    text: "The art is not in making money, but in keeping it.",
    author: "Proverb",
  },
  {
    text: "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    author: "Robert Kiyosaki",
  },
];

// const motivationalQuotes = [
//   "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought, and so broadens the mind.",
//   "Do not save what is left after spending; instead spend what is left after saving.",
//   "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. You can't win until you do this.",
//   "The art is not in making money, but in keeping it.",
//   "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
// ];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing quizzes and quotes
    await Quiz.deleteMany({});
    await Quote.deleteMany({});

    // Insert new quizzes and quotes
    await Quiz.insertMany(quizzes);
    await Quote.insertMany(quotes);

    console.log("Seed data inserted successfully");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
