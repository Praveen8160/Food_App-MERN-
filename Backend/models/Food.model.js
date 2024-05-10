const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
      default:"Food.jpg"
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("Food", FoodSchema);

module.exports = FoodModel;