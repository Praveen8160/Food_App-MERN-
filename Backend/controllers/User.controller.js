const User = require("../models/User.model.js");
const { validationResult } = require("express-validator");
const { GenerateUserToken } = require("../service/authentication.js");
const CreateUserHandle = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    const { Name, email, location, password, Role } = await req.body;
    await User.create({
      Name,
      location,
      email,
      password,
      Role,
    });
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const UserLoginHandler = async (req, res) => {
  const email = req.body.email;
  const userdata = await User.findOne({ email });
  if (!userdata) {
    return res.status(400).json({ error: "Provide valid credential" });
  }
  const isvalidPassword = await userdata.isPasswordCorrect(req.body.password);

  if (!isvalidPassword) {
    return res.status(400).json({ error: "Provide valid credential" });
  }
  const token = GenerateUserToken(userdata);
  const options = {
    httpOnly: true,
    secure: true,
  };
  // console.log(token);
  return res
    .cookie("token", token, options)
    .json({ success: true, role: userdata.Role, token: token });
};
module.exports = {
  CreateUserHandle,
  UserLoginHandler,
};
