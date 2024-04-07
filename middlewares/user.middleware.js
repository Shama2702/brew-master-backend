const { check } = require("express-validator");

const signupValidators = [
  check("first_name")
    .exists()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name is too short")
    .isLength({ max: 20 })
    .withMessage("Name is too long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet"),
  check("last_name")
    .exists()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name is too short")
    .isLength({ max: 20 })
    .withMessage("Name is too long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet"),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 8, max: 25 })
    .withMessage("Password length should be 8-25"),
];

const loginValidators = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 8, max: 25 })
    .withMessage("Password length should be 8-25"),
];

module.exports = {
  signupValidators,
  loginValidators,
};
