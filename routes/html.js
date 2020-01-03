const verifyToken = require('../config/middleware/verifyToken');

module.exports = (app, path, passport) => {
  app.get('/', (req, res) => {
    // if (req.user) {
    //   console.log('logged in already');
    //   res.redirect('/dashboard/' + req.user.id);
    // }
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

  app.get('/dashboard/:userId', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dashboard.html'));
  });

  app.get('/overview/:userId', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/overview.html'));
  });

  app.get('/expenses/:userId', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/expenses.html'));
  });

  app.get('/profile/:userId', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/profile.html'));
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
