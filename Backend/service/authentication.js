const jwt = require("jsonwebtoken");
const GenerateUserToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      Name: user.Name,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};
module.exports = {
  GenerateUserToken,
};
