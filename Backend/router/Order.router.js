const express = require("express");
const router = express.Router();
const { handelordercheckout } = require("../controllers/Order.controller.js");
const {
  CheckAuthenticationCookie,
} = require("../middlewares/authentication.middleware.js");

router.post("/checkout", handelordercheckout);
module.exports = router;
