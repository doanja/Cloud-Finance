const express = require("express");
const router = express.Router();
var db = require("../models");

// Load index page
router.get("/", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.send("test");
  });
});

// Load example page and pass in an example by id
router.get("/example/:id", function(req, res) {
  db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    res.send("test");
  });
});

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.send("404");
});

module.exports = router;
