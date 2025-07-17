const express = require('express');
const router = express.Router();
const userModel = require('./../models/User');
const verifyUserToken = require('./../middleware/auth');



// User profile
router.get('/profile', async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await userModel?.findById(userId, '-password -expenses').lean();
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    res.status(200).json({ message: 'User fetched successfully', user });
});

module.exports = router;