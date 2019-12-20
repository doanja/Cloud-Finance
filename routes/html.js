var path = require("path");

const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get(
    "/dashboard/:userId",
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
    }
  );

  app.get(
    "/overview/:userId",
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, "../public/html/overview.html"));
    }
  );

  app.get(
    "/expenses/",
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, "../public/html/expenses.html"));
    }
  );

  app.get(
    "/profile/:userId",
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, "../public/html/profile.html"));
    }
  );

  app.get("/login", (req, res) => {
    // Checking if user is authenticated. If so, by pass the login page
    // if (req.user) {
    //   res.redirect("/" + req.user.id);
    // }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  app.get("/signup", (req, res) => {
    // Checking if user is authenticated. If so, by pass the signup page
    // if (req.user) {
    //   res.redirect("/" + req.user.id);
    // }
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/404.html"));
  });
};
