const User = require("../models/User.model.js");
const { validationResult } = require("express-validator");
const { GenerateUserToken } = require("../service/authentication.js");
const otp = require("../models/OTP.model.js");
const CreateUserHandle = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ errors: error.array() });
  }
  try {
    const { Name, email, location, Mobile, password, OTP, Role } =
      await req.body;
    const number = "+91 " + Mobile;
    // console.log(req.body);
    // console.log(OTP);
    // console.log(number);
    const data = await otp.findOne({ otp: OTP, phoneNumber: number });
    // console.log(data);
    console.log(number);
    if (data) {
      const userdata = await User.create({
        Name,
        location,
        email,
        password,
        Mobile,
        Role,
      });
      if (userdata) {
        return res.json({ success: true, message: "Successfully Register" });
      } else {
        return res.json({ success: false, message: "Please Try Again!" });
      }
    } else {
      return res.json({ success: false, message: "Enter Correct OTP" });
    }
  } catch (error) {
    console.log(error);
  }
};

const UserLoginHandler = async (req, res) => {
  const email = req.body.email;
  const userdata = await User.findOne({ email });
  if (!userdata) {
    return res.status(400).json({ errors: "Provide valid credential" });
  }
  const isvalidPassword = await userdata.isPasswordCorrect(req.body.password);

  if (!isvalidPassword) {
    return res.status(400).json({ errors: "Provide valid credential" });
  }
  const token = GenerateUserToken(userdata);
  const options = {
    httpOnly: true,
    secure: true,
  };
  console.log(token);
  return res
    .cookie("token", token, options)
    .json({
      success: true,
      user: { role: userdata.Role, email: userdata.email },
      token: token,
    });
};
module.exports = {
  CreateUserHandle,
  UserLoginHandler,
};
