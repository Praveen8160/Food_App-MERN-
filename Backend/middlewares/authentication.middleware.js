const { GetUserToken } = require("../service/authentication");

function CheckAuthenticationCookie(token) {
  return (req, res, next) => {
    const tokancookie = req.cookies[token];
    if (!tokancookie) {
      return next();
    }
    try {
      const UserPayload = GetUserToken(tokancookie);
      req.user = UserPayload;
      console.log(UserPayload);
      return next();
    } catch (error) {
      return res.sendStatus(403);
    }
  };
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/signup");
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) return res.end("unauthorized");

    return next();
  };
}
module.exports = {
  CheckAuthenticationCookie,
};
