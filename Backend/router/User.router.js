const express = require("express");
const { CreateUserHandle } = require("../controllers/User.controller");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User.model.js");
router.post(
  "/Signup",
  body("Name", "Enter your username").trim().notEmpty(),
  body("email", "Enter valid email").notEmpty().isEmail(),
  body("password", "password length should be 6 or more").isLength({ min: 6 }),
  CreateUserHandle
);
module.exports = router;
