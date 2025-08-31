const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // Extract token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: decoded.id, username: decoded.username };

    next();
  } catch (err) {
    // TODO: Better error handling ... 401 for invalid/expired tokens
    res.status(500).json({ error: "Could not verify identity" });
    console.error(err);
    // TODO: avoid logging sensitive info in production
  }
};

module.exports = verifyToken;
