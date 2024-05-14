const Food = require("../models/Food.model.js");
const Category = require("../models/cateogry.model.js");

const GetAllDataFoodHandler = async (req, res) => {
  try {
    const FoodData = await Food.find({});
    const categoryData = await Category.find({});
    return res.json({ FoodData, categoryData });
  } catch (error) {
    console.log("error");
  }
};

module.exports = {
  GetAllDataFoodHandler,
};
