const express = require("express");
const router = express.Router();
const expenseService = require("./../services/expense");

router.post("/", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { category, description, amount, date } = req.body;
  const result = await expenseService.createExpense(
    userId,
    category,
    description,
    amount,
    date
  );

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to create expense", error: result.error });
  }

  return res
    .status(201)
    .json({ message: "Expense created successfully", expense: result.expense });
});

router.get("/", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { filter } = req.query;
  // TODO: implement filtering later

  const result = await expenseService.getExpenses(userId);

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to get expenses", error: result.error });
  }

  return res.status(200).json({
    message: "Expenses fetched successfully",
    expenses: result.expenses,
  });
});

router.get("/latest", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { filter } = req.query;
  // TODO: implement filtering later

  const result = await expenseService.getLatestExpenses(userId);

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to get latest expenses", error: result.error });
  }

  return res.status(200).json({
    message: "Latest expenses fetched successfully",
    expenses: result.expenses,
  });
});

router.get("/:id", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const expenseId = req.params.id;

  const result = await expenseService.getExpenseById(userId, expenseId);

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to get expense", error: result.error });
  }

  return res
    .status(200)
    .json({ message: "Expense fetched successfully", expense: result.expense });
});

router.patch("/:id", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const expenseId = req.params.id;

  const { category, description, amount, date } = req.body;
  const result = await expenseService.updateExpenseById(
    userId,
    expenseId,
    category,
    description,
    amount,
    date
  );

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to update expense", error: result.error });
  }

  return res
    .status(200)
    .json({ message: "Expense updated successfully", expense: result.expense });
});

router.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const expenseId = req.params.id;

  const result = await expenseService.deleteExpenseById(userId, expenseId);

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to delete expense", error: result.error });
  }

  return res.status(204).end();
});

module.exports = router;
