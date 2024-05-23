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
          location: newUserData.Location,
        },
      }
    );
    console.log(newUser);

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
