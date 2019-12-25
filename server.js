require("dotenv").config();
const express = require("express");
const path = require("path");

/* Testing Passport */
const passport = require("passport");
var session = require("express-session");
/* Testing Passport */

const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;
const syncOptions = { force: false };

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

/* Testing Passport */
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport, db);
/* Testing Passport */

// Routes
require("./routes/auth")(app, passport, path);
require("./routes/users")(app);
require("./routes/remainder")(app);
require("./routes/categories")(app);
require("./routes/expenses")(app);
require("./routes/html")(app, path);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () =>
    console.log(
      `Server started on port ${PORT}. Visit http://localhost:${PORT}/`
    )
  );
});

module.exports = app;
