const db = require('../models');

module.exports = function(app, passport, path) {
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signin.html'));
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup'
    })
  );

  app.post('/login', passport.authenticate('local'), (req, res) => {
    // redirect to overview.html
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/signup'
    })
  );

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login'); // TODO: maybe redirect to signed out page with links to sign in?
  });
};
