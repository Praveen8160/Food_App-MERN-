const express = require("express");
const Router = express.Router();
const {
  GetAllDataFoodHandler,
  getSinglefoodData,
} = require("../controllers/GetFoodData.controller.js");

Router.get("/Allfood", GetAllDataFoodHandler);
Router.get("/Singlefood/:id", getSinglefoodData);
module.exports = Router;
