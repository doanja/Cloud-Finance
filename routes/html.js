const isLoggedIn = require('../config/middleware/isLoggedIn');

module.exports = (app, path) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

  app.get('/dashboard/:userId', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dashboard.html'));
  });

  app.get('/overview/:userId', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/overview.html'));
  });

  app.get('/expenses/:userId', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/expenses.html'));
  });

  app.get('/profile/:userId', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/profile.html'));
  });

  app.get('/login', (req, res) => {
    // redirect user to dashboard if they're already logged in
    if (req.user) {
      res.redirect('/dashboard/' + req.user.id);
    }
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.get('/signup', (req, res) => {
    // redirect user to dashboard if they're already logged in
    if (req.user) {
      res.redirect('/dashboard/' + req.user.id);
    }
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
