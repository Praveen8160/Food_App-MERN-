const express = require("express");
const {
  CreateUserHandle,
  UserLoginHandler,
  getUserData,
  updateUser,
} = require("../controllers/User.controller");
const { body } = require("express-validator");
const router = express.Router();
const User = require("../models/User.model.js");
router.post(
  "/Signup",
  body("Name", "Enter your username").trim().notEmpty(),
  body("email", "Enter valid email").notEmpty().isEmail(),
  body("password", "password length should be 6 or more").isLength({ min: 6 }),
  body("OTP", "OTP is invalid").isLength({ min: 4 }),
  CreateUserHandle
);
router.post(
  "/SignIn",
  body("email", "Enter valid email").notEmpty().isEmail(),
  body("password", "password length should be 6 or more").isLength({ min: 6 }),
  UserLoginHandler
);
router.get("/getUser", getUserData);
router.post("/updateUser", updateUser);
module.exports = router;
