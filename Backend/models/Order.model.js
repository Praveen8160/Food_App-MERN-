const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  Orders: {
    type: Array,
    required: true,
  },
});
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
