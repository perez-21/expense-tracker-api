const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true},
  expenses: [{type: mongoose.Schema.Types.ObjectId, ref: "Expense"}],
  budget: {type: mongoose.Schema.Types.ObjectId, ref: "Budget"}

}, {timestamps: true});

// returns user without password

module.exports = mongoose.model('User', userSchema);
