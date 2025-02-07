const { validationResult } = require("express-validator");

const validationMiddleware = (errorMessages) => (req, res, next) => {
  const lang = req.headers["accept-language"] || "en";

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const translatedErrors = errors.array().map((error) => ({
      field: error.path,
      msg: errorMessages[lang]?.[error.msg] || error.msg,
    }));

    return res.status(400).json({ errors: translatedErrors });
  }

  next();
};

module.exports = validationMiddleware;
