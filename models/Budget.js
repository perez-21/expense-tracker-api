const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  yearly: { type: Number, min: [0, "Must be positive number"] },
  monthly: { type: Number, min: [0, "Must be positive number"] },
});

module.exports = mongoose.model("Budget", budgetSchema);
