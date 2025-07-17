const mongoose = require("mongoose");
const { Schema } = mongoose;
const budgetModel = require("./Budget");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
    budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isNew) return;
  try {
    const budget = await budgetModel.create({ user: this._id });
    this.budget = budget._id;
  } catch (error) {
    console.error("Could not create budget for user", error);
  }
});

module.exports = mongoose.model("User", userSchema);
