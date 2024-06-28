const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/quizzes", require("./routes/quizzes"));
app.use("/api/challenges", require("./routes/challenges"));
app.use("/api/quotes", require("./routes/quotes"));

// Logout route (doesn't require server-side logic, handled on client-side)
app.post("/api/logout", (req, res) => {
  res.json({ msg: "Logout successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
