const budgetModel = require('./../models/Budget');

const getBudgetById = async (userId) => {
    try {
        const budget = await budgetModel.findOne({ user: userId });
        if (!budget) {
            return { error: "Not authorised", errorCode: 403 };
        }
        return { budget };

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 }
    }
}

const updateBudgetById = async (userId, yearly, monthly) => {
    try {
        let budget = await budgetModel.findOne({ user: userId });
        if (!budget) {
            return { error: "Not authorised", errorCode: 403 };
        }
        budget = await budgetModel.findByIdAndUpdate(budget._id, { yearly: yearly || null, monthly: monthly || null, });
        return { budget };

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error', errorCode: 500 }
    }
}

module.exports = { getBudgetById, updateBudgetById }