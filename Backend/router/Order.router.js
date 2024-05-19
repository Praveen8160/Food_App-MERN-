const express = require("express");
const router = express.Router();
const {
  handelordercheckout,
  handleMyorder,
} = require("../controllers/Order.controller.js");
const {
  CheckAuthenticationCookie,
} = require("../middlewares/authentication.middleware.js");
const instance = require("../utils/Razorpay.js");
const crypto = require("crypto");

router.post("/checkout", handelordercheckout);
router.post("/myorder", CheckAuthenticationCookie, handleMyorder);
router.get("/checkAuth", CheckAuthenticationCookie, (req, res) => {
  res.sendStatus(200);
});

router.post("/payment", async (req, res) => {
  console.log(req.body.amount);
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    console.log(order);

    res.json({ success: true, order });
  } catch (error) {
    console.log("error", error);
  }
});
router.post("/paymentverify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.Razorpay_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log("1");
    const isAuthentic = razorpay_signature === expectedSignature;

    if (isAuthentic) {
      return res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log("error", error);
  }
});
router.get("/rozarpatKey", (req, res) => {
  res.json({ key: process.env.Razorpay_KEY_ID });
});
module.exports = router;
