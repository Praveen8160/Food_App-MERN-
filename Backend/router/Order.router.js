const express = require("express");
const router = express.Router();
const {
  handelordercheckout,
  handleMyorder,
} = require("../controllers/Order.controller.js");

router.post("/checkout", handelordercheckout);
router.post("/myorder", handleMyorder);
module.exports = router;
