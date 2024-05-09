const User = require("../models/User.model.js");
const { validationResult } = require("express-validator");
const CreateUserHandle = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    // const data = await req.body;
    // console.log(data);
    const { Name, email, location, password } = await req.body;
    await User.create({
      Name,
      location,
      email,
      password,
    });
    return res.json({ status: true });
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
  if (userdata.password !== req.body.password) {
    return res.status(400).json({ error: "Provide valid credential" });
  }
  return res.json({ success: true });
};
module.exports = {
  CreateUserHandle,
  UserLoginHandler,
};
