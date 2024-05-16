const Order = require("../models/Order.model.js");
const handelordercheckout = async (req, res) => {
  let data = req.body.orderData;
  await data.splice(0, 0, { orderDate: req.body.orderDate });
  let id = await Order.findOne({ email: req.body.email });
  if (id === null) {
    try {
      await Order.create({
        email: req.body.email,
        Orders: [data],
      });
      return res.json({ success: true });
    } catch (error) {
      return res.send("server error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { Orders: data } }
      );
      return res.json({ success: true });
    } catch (error) {
      res.send("server Error", error.message);
    }
  }
  return res.json({ success: true });
};

module.exports = {
  handelordercheckout,
};
