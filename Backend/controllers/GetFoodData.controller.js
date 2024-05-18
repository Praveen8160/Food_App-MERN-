const Food = require("../models/Food.model.js");
const Category = require("../models/cateogry.model.js");

const GetAllDataFoodHandler = async (req, res) => {
  // const token = req.cookies.token;
  // // console.log("dsfdg");
  // if (!token) {
  //   console.log(token);
  //   return res.json({
  //     success: false,
  //     message: "Access denied. No token provided.",
  //   });
  // }
  try {
    // console.log(token);
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
