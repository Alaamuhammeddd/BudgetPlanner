const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");

exports.validateRegisterUser = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("Username is Required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("fullName")
    .notEmpty()
    .withMessage("Email is Required")
    .isLength({ min: 6 })
    .withMessage("Email should be at least 6 characters")
    .contains("@")
    .withMessage("please enter a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("password must be 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
