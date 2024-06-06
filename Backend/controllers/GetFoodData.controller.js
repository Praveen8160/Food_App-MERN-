const Food = require("../models/Food.model.js");
const Category = require("../models/cateogry.model.js");

const GetAllDataFoodHandler = async (req, res) => {
  if (req.query.user) {
    try {
      const FoodData = await Food.find({ seller: req.user._id });
      return res.json({ FoodData });
    } catch (error) {
      console.error("Error fetching food data:", error);
      res.status(500).json({ message: "Error fetching food data" });
    }
  } else {
    try {
      const FoodData = await Food.find({});
      const categoryData = await Category.find({});
      return res.json({ FoodData, categoryData });
    } catch (error) {
      console.error("Error fetching food and category data:", error);
      res
        .status(500)
        .json({ message: "Error fetching food and category data" });
    }
  }
};

const getSinglefoodData = async (req, res) => {
  try {
    const fooddata = await Food.findOne({ _id: req.params.id });
    if (fooddata) {
      res.json({ success: true, fooddata });
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
};
module.exports = {
  GetAllDataFoodHandler,
  getSinglefoodData,
};
