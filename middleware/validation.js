const { validationResult } = require('express-validator');

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error", errors: errors.array().map((error) => error.msg) });
    }

    next();
}

module.exports = { validationErrorHandler }