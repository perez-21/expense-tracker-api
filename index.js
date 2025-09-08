const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { LoginRateLimiter } = require("./services/rate-limiters");
const { initializeMongoose } = require("./configs/database");
const mongoose = require("mongoose");
const verifyUserToken = require("./middleware/auth");
const gloabalErrorHandler = require("./middleware/global-error-handler");
const authRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budgets");
const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expenses");
const config = require("./configs/config");

const startServer = async () => {
  // database
  
  const { mongoInstance, mongoConn } = await initializeMongoose();


  const app = express();
  const port = config.PORT;

  // middleware

  const corsOptions = {
    origin: "*",
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));

  app.disable("x-powered-by");

  // initializeLoginRateLimiter
  const loginRateLimiterService = LoginRateLimiter.getInstance(mongoInstance, mongoConn);
  app.locals.loginRateLimiterService = loginRateLimiterService;

  app.use("/api/auth", authRoutes);
  app.use("/api/budgets", verifyUserToken, budgetRoutes);
  app.use("/api/expenses", verifyUserToken, expenseRoutes);
  app.use("/api/users", verifyUserToken, userRoutes);

  // global error handling
  app.use(gloabalErrorHandler);

  app.listen(port, () => {
    console.log(`Expenses server listening on port ${port}`);
  });
};

startServer();
