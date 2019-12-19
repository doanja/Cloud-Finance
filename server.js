require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;
const syncOptions = { force: true };

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Static directory
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/api"));
app.use("/", require("./routes/html"));

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}. Visit http://localhost:${PORT}/`)
  );
});

module.exports = app;
