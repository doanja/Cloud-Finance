require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/apiRoutes"));
app.use("/", require("./routes/htmlRoutes"));

const syncOptions = { force: true };

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
