const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const OTP = require("../models/OTP.model.js");
const User = require("../models/User.model.js");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const generateRandomOpt = () => {
  return Math.floor(10000 + Math.random() * 900000).toString();
};
router.post("/sendotp", async (req, res) => {
  const { to, email } = req.body;
  const existuser = await User.findOne({ email });
  if (existuser) {
    return res.json({ success: false, errors: "User Already Register" });
  }
  const number = "+91 " + to;
  if (!to) return res.json({ errors: "enter your mobile number" });
  const otp = generateRandomOpt();
  try {
    const data = await OTP.create({
      phoneNumber: number,
      otp: otp,
    });
    console.log(data);
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: number,
    });
    console.log(`OTP sent to ${to}`);
    res.json({ success: true, message: "otp successfully sent" });
  } catch (error) {
    res.json({
      success: false,
      errors: "Failed to send OTP Please Enter Valid Mobile Number",
    });
  }
});
module.exports = router;
