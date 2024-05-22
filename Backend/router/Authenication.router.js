const express = require("express");
const router = express.Router();
const { GetUserToken } = require("../service/authentication.js");
router.get("/Auth", (req, res) => {
  try {
    const auth = req.cookies.token;
    if (auth) {
      const UserPayload = GetUserToken(auth);
      const Role = UserPayload.role;
      res.json({ isAuthenticated: true, Role: Role });
    } else {
      res.json({ isAuthenticated: false });
    }
  } catch (error) {
    return res.json({ error: error });
  }
});

router.post("/Logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

module.exports = router;
