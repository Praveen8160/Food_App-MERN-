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

module.exports = {
  CreateUserHandle,
};
