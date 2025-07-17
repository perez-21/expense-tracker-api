const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true, enum: ["Groceries", "Leisure", "Utilities", "Clothing", "Health", "Electronics", "Internet", "Rent", "Vehicle", "Family", "Savings", "Transportation", "Home", "Other"] },
    description: { type: String },
    amount: { type: Number, required: true, min: [0, "Must be positive number"] },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
