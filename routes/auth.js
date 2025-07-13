const express = require('express');
const router = express.Router();
const authService = require('./../services/auth');
const authMid = require('./../middleware/auth');
const userModel = require('./../models/User');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    if (result.error) {
        return res.status(result.errorCode).json({ message: 'Failed to login', error: result.error })
    }

    res.status(200).json({ message: 'Logged in succesfully', access_token: result.token });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.register(username, password);
    if (result.error) {
        return res.status(result.errorCode).json({ message: 'Failed to register', error: result.error })
    }

    res.status(200).json({ message: 'Registered successfully', access_token: result.token });
});

router.get('/me', authMid, async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await userModel?.findById(userId, '-password').lean();
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    res.status(200).json({ message: 'User fetched successfully', user });
});

module.exports = router;

