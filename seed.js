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
      {
        question: "What is the purpose of a piggy bank?",
        options: [
          "To keep your toys",
          "To save money",
          "To store cookies",
          "To play music",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the difference between needs and wants?",
        options: [
          "There is no difference",
          "Needs are things you must have, wants are things you'd like to have",
          "Wants are more important than needs",
          "Needs and wants are the same thing",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is income?",
        options: [
          "Money you spend",
          "Money you earn or receive",
          "Money you borrow",
          "Money you lose",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the best way to grow your money over time?",
        options: [
          "Spend it all immediately",
          "Hide it under your mattress",
          "Save and invest it wisely",
          "Give it all away",
        ],
        correctAnswer: 2,
      },
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
      {
        question: "What is a credit score?",
        options: [
          "Your bank account balance",
          "A number that represents your creditworthiness",
          "The amount of money you owe",
          "Your savings account interest rate",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a stock?",
        options: [
          "A type of loan",
          "A piece of ownership in a company",
          "A government bond",
          "A type of bank account",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is inflation?",
        options: [
          "The rise in the general level of prices of goods and services",
          "The fall in the value of money",
          "The increase in wages",
          "The decrease in unemployment",
        ],
        correctAnswer: 0,
      },
      {
        question: "What is a 401(k)?",
        options: [
          "A type of car",
          "A retirement savings plan sponsored by an employer",
          "A government loan",
          "A type of credit card",
        ],
        correctAnswer: 1,
      },
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
      {
        question: "What is a mutual fund?",
        options: [
          "A type of bank account",
          "A pool of money from many investors used to purchase a diversified portfolio",
          "A government bond",
          "A type of loan",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is the difference between a traditional IRA and a Roth IRA?",
        options: [
          "There is no difference",
          "Traditional IRA contributions are tax-deductible, Roth IRA withdrawals are tax-free",
          "Roth IRA contributions are tax-deductible, Traditional IRA withdrawals are tax-free",
          "Both have the same tax treatment",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is asset allocation?",
        options: [
          "Selling all your assets",
          "Distributing investments among different asset categories",
          "Investing only in stocks",
          "Keeping all your money in cash",
        ],
        correctAnswer: 1,
      },
      {
        question: "What is a bear market?",
        options: [
          "A market where stock prices are rising",
          "A market where stock prices are falling",
          "A market for selling bears",
          "A market that only operates at night",
        ],
        correctAnswer: 1,
      },
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
