const express = require("express");
const router = express.Router();
const {
  handelordercheckout,
  handleMyorder,
} = require("../controllers/Order.controller.js");
const {
  CheckAuthenticationCookie,
} = require("../middlewares/authentication.middleware.js");
router.post("/checkout", handelordercheckout);
router.post("/myorder", CheckAuthenticationCookie, handleMyorder);
router.get("/checkAuth", CheckAuthenticationCookie, (req, res) => {
  res.sendStatus(200);
});
module.exports = router;
