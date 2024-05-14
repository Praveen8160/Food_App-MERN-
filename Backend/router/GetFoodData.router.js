const express = require("express");
const Router = express.Router();
const {
  GetAllDataFoodHandler,
} = require("../controllers/GetFoodData.controller.js");
Router.get("/Allfood", GetAllDataFoodHandler);
module.exports = Router;
