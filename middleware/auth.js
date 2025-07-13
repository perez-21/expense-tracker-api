const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {

        // Extract token from header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json('Invalid token');
        }

        req.user = { id: decoded.id, username: decoded.username };

        next();

    }
    catch (err) {
        res.status(500).json({ error: "Could not verify identity" });
        console.error(err);
    }

}

module.exports = verifyToken;