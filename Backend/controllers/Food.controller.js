const Food = require("../models/Food.model.js");
const { validationResult } = require("express-validator");
const UploadOnCloudinary = require("../utils/cloudinary.js");
const AddFoodHandler = async (req, res) => {
  const oldUserData = req.user;
  const id = oldUserData._id;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ errors: error.array() });
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
      seller: id,
      description,
      price,
    });
    console.log(Fooddata);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteFoodHandler = async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    await Food.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const UpdateFoodHandler = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ errors: error.array() });
  }
  try {
    const { name, category, foodType, description, price } = req.body;
    const foodimagepath = req.file.path;
    if (!foodimagepath) {
      return res.json({ errors: "image is required" });
    }
    const Image = await UploadOnCloudinary(foodimagepath);
    const updatevalue = await Food.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name,
          category,
          foodType,
          Image: Image.url,
          description,
          price,
        },
      },
      { returnNewDocument: true }
    );
    if (updatevalue) {
      res.json({ success: true });
    } else {
      res.status(404).send("Food not found");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  AddFoodHandler,
  deleteFoodHandler,
  UpdateFoodHandler,
};
