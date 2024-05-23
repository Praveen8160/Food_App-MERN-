const Order = require("../models/Order.model.js");
const { GetUserToken } = require("../service/authentication.js");
const handelordercheckout = async (req, res) => {
  let data = req.body.orderData;
  await data.splice(0, 0, { orderDate: req.body.orderDate });
  let id = await Order.findOne({ userId: req.user._id });
  if (id === null) {
    try {
      await Order.create({
        userId: req.user._id,
        Orders: [data],
      });
      return res.json({ success: true });
    } catch (error) {
      return res.send("server error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { userId: req.user._id },
        { $push: { Orders: data } }
      );
      return res.json({ success: true });
    } catch (error) {
      res.send("server Error", error.message);
    }
  }
  return res.json({ success: true });
};
const handleMyorder = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  try {
    const userId = req.user._id;
    const userorder = await Order.findOne({ userId });
    return res.json({ success: true, order: userorder.Orders });
  } catch (error) {
    console.log(error.message);
    return res.json({ error });
  }
};
module.exports = {
  handelordercheckout,
  handleMyorder,
};
