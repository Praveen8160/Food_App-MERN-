const { GetUserToken } = require("../service/authentication");

const CheckAuthenticationCookie=(req,res,next) =>{
    const tokancookie = req.cookies.token;
    if (!tokancookie) {
      return res.sendStatus(401); ;
    }
    try {
      const UserPayload = GetUserToken(tokancookie);
      req.user = UserPayload;
      // console.log(UserPayload);
      return next();
    } catch (error) {
      return res.sendStatus(403);
    }
  };

module.exports = {
  CheckAuthenticationCookie,
};
