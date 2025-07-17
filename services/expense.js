const expenseModel = require('./../models/Expense');

const createExpense = async (userId, category, description, amount, date) => {
    try {
        const expense = await expenseModel.create({ user: userId, category, description: description || '', amount, date });

        return { expense };

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 };
    }

}

const deleteExpenseById = async (userId, expenseId) => {
    try {
        const expense = await expenseModel.deleteOne({ user: userId, _id: expenseId });
        return { expense };

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 }
    }
}

const getExpenses = async (userId) => {
    try {
        const expenses = await expenseModel.find({ user: userId });
        return { expenses };
    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 };
    }
}

const getLatestExpenses = async (userId) => {
    try {
        const expenses = await expenseModel.find({ user: userId }).sort('-date').limit(10);
        return { expenses };
    }

    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 };
    }
}

const getExpenseById = async (userId, expenseId) => {
    try {
        const expense = await expenseModel.findOne({ user: userId, _id: expenseId });
        if (!expense) {
            return { error: "Not authorised", errorCode: 403 };
        }
        return { expense };

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 }
    }
}

const updateExpenseById = async (userId, expenseId, category, description, amount, date) => {
    try {
        let expense = await expenseModel.findOne({ user: userId, _id: expenseId });
        if (!expense) {
            return { error: "Not authorised", errorCode: 403 };
        }
        expense = await expenseModel.findByIdAndUpdate(expenseId, { category: category || null, description: description || null, amount: amount || null, date: date || null });
        return { expense };

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 }
    }
}

module.exports = { createExpense, getExpenses, getLatestExpenses, getExpenseById, updateExpenseById, deleteExpenseById };