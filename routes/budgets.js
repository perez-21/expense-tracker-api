const express = require("express");
const router = express.Router();
const budgetService = require("./../services/budget");

router.get("", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const result = await budgetService.getBudgetById(userId);

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to get budget", error: result.error });
  }

  return res
    .status(200)
    .json({ message: "Budget fetched successfully", budget: result.budget });
});

router.patch("", async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { yearly, monthly } = req.body;
  const result = await budgetService.updateBudgetById(userId, yearly, monthly);

  if (result.error) {
    return res
      .status(result.errorCode)
      .json({ message: "Failed to update budget", error: result.error });
  }

  return res
    .status(200)
    .json({ message: "Budget updated successfully", budget: result.budget });
});

module.exports = router;
