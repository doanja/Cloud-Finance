module.exports = function(app, passport) {
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/login",
      failureRedirect: "/signup"
    })
  );

  app.post("/login", passport.authenticate("local-login"), (req, res) => {
    res.redirect("/dashboard/" + req.user.id);
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login"); // TODO: maybe redirect to signed out page with links to sign in?
  });
};
