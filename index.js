const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { LoginRateLimiter } = require("./services/rate-limiters");
const mongoose = require("mongoose");
const verifyUserToken = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budgets");
const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expenses");

dotenv.config();
const app = express();
const port = process.env.PORT;

// middleware

// TODO: Restrict soon
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');
// TODO: global error handling

// database

// TODO: graceful handling for connection failure
mongoInstance = mongoose.connect("mongodb://127.0.0.1:27017/expense_test");
mongoConn = mongoInstance.connection;

// initialize login ratelimiting
new LoginRateLimiter(mongoInstance, mongoConn);


app.use("/api/auth", authRoutes);
app.use("/api/budgets", verifyUserToken, budgetRoutes);
app.use("/api/expenses", verifyUserToken, expenseRoutes);
app.use("/api/users", verifyUserToken, userRoutes);

app.listen(port, () => {
  console.log(`Expenses server listening on port ${port}`);
});
