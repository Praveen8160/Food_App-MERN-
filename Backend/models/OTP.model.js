const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.OTP_EXPIRATION_SECONDS,
  },
});

const otp = mongoose.model("OTP", otpSchema);

module.exports = otp;
