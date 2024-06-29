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
const getAllSellerOrder = async (req, res) => {
  try {
    const pipeline = [
      { $unwind: "$Orders" },
      { $unwind: "$Orders" },
      { $match: { "Orders.Seller": "664c6f1f99b4a6f4771633fd" } },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          Orders: { $push: "$Orders" },
        },
      },
      {
        $lookup: {
          from: "users", // Replace with the actual name of the users collection
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          "userDetails.password": 0, // Exclude the password field
        },
      }, // Unwind to get the user details as an object instead of an array
    ];

    const results = await Order.aggregate(pipeline);

    return res.json({ results });
  } catch (error) {
    console.log(error.message);
    return res.json({ error });
  }
};
module.exports = {
  handelordercheckout,
  handleMyorder,
  getAllSellerOrder,
};
