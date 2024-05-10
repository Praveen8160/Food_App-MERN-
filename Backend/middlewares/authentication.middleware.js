const { GetUserToken } = require("../service/authentication");

function CheckAuthenticationCookie(req, _, next) {
  // return (req, _, next) => {
    const tokancookie =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!tokancookie) {
      return next();
    }
    try {
      const UserPayload = GetUserToken(tokancookie);
      req.user = UserPayload;
      return next()
    } catch (error) {
      return next();
    }
  };

module.exports = {
  CheckAuthenticationCookie,
};
