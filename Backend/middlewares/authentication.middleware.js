const { GetUserToken } = require("../service/authentication");

function CheckAuthenticationCookie(cookie) {
  return (req, res, next) => {
    const tokancookie = req.cookies[cookie];
    if (!tokancookie) {
      return next();
    }
    try {
      const UserPayload = GetUserToken(tokancookie);
      req.user = UserPayload;
      console.log(UserPayload);
      return next();
    } catch (error) {
      return next();
    }
  };
}

module.exports = {
  CheckAuthenticationCookie,
};
