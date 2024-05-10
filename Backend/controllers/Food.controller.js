const Food = require("../models/Food.model.js");
const { validationResult } = require("express-validator");

const AddFoodHandler = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { name, category, foodType, img, description, price } =
      req.body;

    const Fooddata = await Food.create({
      name,
      category,
      foodType,
      img,
      seller:req.user._id,
      description,
      price,
    });
    console.log(Fooddata);
    res.json({ success: true });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  AddFoodHandler,
};
