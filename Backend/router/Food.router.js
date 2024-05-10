const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { AddFoodHandler } = require("../controllers/Food.controller.js");

router.post(
  "/Add-Food",
  body("name", "Food name is required").trim().notEmpty(),
  body("category", "category is required").trim().notEmpty(),
  body("foodType", "foodType is required").trim().notEmpty(),
  body("description", "description is required").trim().notEmpty(),
  body("price", "price is required").trim().notEmpty(),
  AddFoodHandler
);
module.exports = router;
