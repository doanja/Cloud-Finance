const db = require("../models");

module.exports = function(app, passport) {
  app.post("/login", passport.authenticate("local"), (req, res) => {
    // redirect to overview.html
  });

  app.post("/signup", (req, res) => {
    // create the user,
    // then redirect to login
    // catch errors
    // redirect to error page?
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login"); // TODO: maybe redirect to signed out page with links to sign in?
  });
};
