const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("home");
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.send("404");
  });
};
