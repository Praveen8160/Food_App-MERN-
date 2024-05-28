const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { AddFoodHandler } = require("../controllers/Food.controller.js");
const upload = require("../middlewares/multer.middleware.js");

router.post(
  "/Add-Food",
  upload.single("Food_img"),
  [
    body("Food_img").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      console.log("object");
      console.log(req.user);
      return true;
    }),
    body("name", "Food name is required").trim().notEmpty(),
    body("category", "category is required").trim().notEmpty(),
    body("foodType", "foodType is required").trim().notEmpty(),
    body("description", "description is required").trim().notEmpty(),
    body("price", "price is required").trim().notEmpty(),
  ],
  AddFoodHandler
);
module.exports = router;
