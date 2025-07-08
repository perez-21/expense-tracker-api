const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
 
dotenv.config();
const app = express();
const port = process.env.PORT;

// middleware

const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// database


mongoose.connect('mongodb://127.0.0.1:27017/expense_test');

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Expenses server listening on port ${port}`);
});