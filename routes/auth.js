module.exports = function(app, passport, path) {
  app.post(
    "/signup",
    // req.body will be passed to passport.js
    passport.authenticate(
      "local-signup",
      // ),
      // (req, res) => {
      //   res.redirect('/dashboard');
      // }
      {
        successRedirect: "/login",
        failureRedirect: "/signup"
      }
    )
  );

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/dashboard",
      failureRedirect: "/login"
    })
  );

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login"); // TODO: maybe redirect to signed out page with links to sign in?
  });
};
