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

const GetUserToken = (token) => {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
};
module.exports = {
  GenerateUserToken,
  GetUserToken,
};