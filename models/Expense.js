const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }

}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
