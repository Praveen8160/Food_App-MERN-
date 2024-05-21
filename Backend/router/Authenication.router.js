const express = require("express");
const router = express.Router();

router.get("/Auth", (req, res) => {
  const auth = req.cookies.token;
  if (auth) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.post("/Logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

module.exports = router;
