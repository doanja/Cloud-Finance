const db = require('../models');
const isLoggedIn = require('../config/middleware/isLoggedIn');

module.exports = (app, path) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

  app.get(
    // TODO: ADD BACK IN USER ID
    '/dashboard/',
    isLoggedIn,
    (req, res) => {
      res.sendFile(path.join(__dirname, '../public/html/dashboard.html'));
    }
  );

  app.get(
    // TODO: ADD BACK IN USER ID
    '/overview/',
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, '../public/html/overview.html'));
    }
  );

  app.get(
    // TODO: ADD BACK IN USER ID
    '/expenses/',
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, '../public/html/expenses.html'));
    }
  );

  app.get(
    // TODO: ADD BACK IN USER ID
    '/profile/',
    /*isAuthenticated,*/ (req, res) => {
      res.sendFile(path.join(__dirname, '../public/html/profile.html'));
    }
  );

  app.get('/login', (req, res) => {
    // Checking if user is authenticated. If so, by pass the login page
    // if (req.user) {
    //   res.redirect("/" + req.user.id);
    // }
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.get('/signup', (req, res) => {
    // Checking if user is authenticated. If so, by pass the signup page
    // if (req.user) {
    //   res.redirect("/" + req.user.id);
    // }
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
