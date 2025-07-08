const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    yearly: {type: Number},
    monthly: {type: Number}

});

module.exports = mongoose.model('Budget', budgetSchema);