const express = require("express");
const router = express.Router();
var db = require("../models");

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.send("404");
});

module.exports = router;
