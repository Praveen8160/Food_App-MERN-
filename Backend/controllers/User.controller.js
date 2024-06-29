const User = require("../models/User.model.js");
const { validationResult } = require("express-validator");
const validator = require("validator");
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
    const data = await otp.findOne({ otp: OTP, phoneNumber: number });
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
    return res.json({ errors: "Provide valid credential" });
  }
  const isvalidPassword = await userdata.isPasswordCorrect(req.body.password);

  if (!isvalidPassword) {
    return res.json({ errors: "Provide valid credential" });
  }
  const authtoken = GenerateUserToken(userdata);
  // const options = {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   path: "/",
  // };

  res.cookie("token", authtoken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.cookie("email", "huuhuhu");
  return res.json({
    success: true,
    user: { role: userdata.Role, email: userdata.email },
  });
};
const getUserData = async (req, res) => {
  try {
    const userid = req.user._id;
    const user = await User.findOne({ _id: userid }).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ error: error });
  }
};
const updateUser = async (req, res) => {
  if (!validator.isEmail(req.body.User.email)) {
    return res.json({ error: "Enter valid email" });
  }
  if (validator.isEmpty(validator.trim(req.body.User.Name))) {
    return res.json({ error: "Name is required" });
  }
  if (validator.isEmpty(validator.trim(req.body.User.location))) {
    return res.json({ error: "Location is required" });
  }
  try {
    const newUserData = req.body.User;
    const oldUserData = req.user;
    console.log(oldUserData.email);
    const newUser = await User.updateOne(
      { _id: oldUserData._id },
      {
        $set: {
          Name: newUserData.Name,
          email: newUserData.email,
          location: newUserData.location,
        },
      }
    );
    return res.json({ success: true });
  } catch (error) {
    return res.json({ error: error });
  }
};
module.exports = {
  CreateUserHandle,
  UserLoginHandler,
  getUserData,
  updateUser,
};
