const expenseModel = require("./../models/Expense");

const createExpense = async (userId, category, description, amount, date) => {
  try {
    const expense = await expenseModel.create({
      user: userId,
      category,
      description: description || "",
      amount,
      date,
    });
    return { expense: structureExpense(expense) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const deleteExpenseById = async (userId, expenseId) => {
  try {
    await expenseModel.deleteOne({ user: userId, _id: expenseId });
    return {};
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const getExpenses = async (userId, limit, offset, category, sort, order) => {

  const filter = {
    user: userId,
  }
  if (category) {
    filter.category = category;
  }

  const sortQuery = `${order === "asc" ? "" : "-"}${sort ? sort : "date"}`;

  
  try {
    const expenses = await expenseModel.find(filter)
      .sort(sortQuery)
      .skip(offset ? offset : 0)
      .limit(limit);
    if (expenses.length === 0) {
      return { error: "Expenses not found", errorCode: 404 };
    }

    return { expenses: expenses.map((expense) => structureExpense(expense)) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const getLatestExpenses = async (userId) => {
  try {
    const expenses = await expenseModel
      .find({ user: userId })
      .sort("-date")
      .limit(10);
    return { expenses: expenses.map((expense) => structureExpense(expense)) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const getExpenseById = async (userId, expenseId) => {
  try {
    const expense = await expenseModel.findOne({
      user: userId,
      _id: expenseId,
    });
    if (!expense) {
      return { error: "Not authorised", errorCode: 403 };
    }
    return { expense: structureExpense(expense) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const updateExpenseById = async (
  userId,
  expenseId,
  category,
  description,
  amount,
  date
) => {
  try {
    let expense = await expenseModel.findOne({ user: userId, _id: expenseId });
    if (!expense) {
      return { error: "Not authorised", errorCode: 403 };
    }
    expense = await expenseModel.findByIdAndUpdate(
      expenseId,
      {
        category: category || expense.category,
        description: description || expense.description,
        amount: amount || expense.amount,
        date: date || expense.date,
      },
      { new: true }
    );
    return { expense: structureExpense(expense) };
  } catch (err) {
    console.error(err);
    return { error: "Server error", errorCode: 500 };
  }
};

const structureExpense = (expense) => {
  const {
    _id,
    user,
    category,
    description,
    amount,
    date,
    createdAt,
    updatedAt,
  } = expense;
  return {
    id: _id,
    userId: user,
    category,
    description,
    amount,
    date,
    createdAt,
    updatedAt,
  };
};

module.exports = {
  createExpense,
  getExpenses,
  getLatestExpenses,
  getExpenseById,
  updateExpenseById,
  deleteExpenseById,
};
