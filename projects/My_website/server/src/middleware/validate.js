const { validationResult } = require('express-validator');

/** Run after express-validator chains: returns 400 on errors */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((e) => e.msg).join('. '),
      errors: errors.array(),
    });
  }
  return next();
};

module.exports = { validate };
