const Food = require("../models/Food.model.js");
const { validationResult } = require("express-validator");
const UploadOnCloudinary = require("../utils/cloudinary.js");
const AddFoodHandler = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { name, category, foodType, description, price } = req.body;
    console.log(req.file.path);
    const foodimagepath = req.file.path;
    if (!foodimagepath) {
      return res.json({ errors: "image is required" });
    }
    const Image = await UploadOnCloudinary(foodimagepath);
    const Fooddata = await Food.create({
      name,
      category,
      foodType,
      Image: Image.url,
      seller: "1234",
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
