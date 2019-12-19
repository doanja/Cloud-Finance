const express = require("express");
const router = express.Router();
var db = require("../models");

// Get all examples
router.get("/api/examples", function(req, res) {
  db.Example.findAll({}).then(function(dbExamples) {
    res.json(dbExamples);
  });
});

// Create a new example
router.post("/api/examples", function(req, res) {
  db.Example.create(req.body).then(function(dbExample) {
    res.json(dbExample);
  });
});

// Delete an example by id
router.delete("/api/examples/:id", function(req, res) {
  db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
    res.json(dbExample);
  });
});

module.exports = router;
