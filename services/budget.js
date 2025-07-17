const budgetModel = require("./../models/Budget");

const getBudgetById = async (userId) => {
  try {
    const budget = await budgetModel.findOne({ user: userId });
    if (!budget) {
      return { error: "Budget not found", errorCode: 404 };
    }
    return { budget: structureBudget(budget) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const updateBudgetById = async (userId, yearly, monthly) => {
  try {
    let budget = await budgetModel.findOne({ user: userId });
    if (!budget) {
      return { error: "Budget not found", errorCode: 404 };
    }
    budget = await budgetModel.findByIdAndUpdate(
      budget._id,
      { yearly: yearly || budget.yearly, monthly: monthly || budget.monthly },
      { new: true }
    );
    return { budget: structureBudget(budget) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const structureBudget = (budget) => {
  const { _id, user, monthly, yearly } = budget;
  return {
    id: _id,
    userId: user,
    monthly,
    yearly,
  };
};

module.exports = { getBudgetById, updateBudgetById };
