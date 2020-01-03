const verifyToken = require('../config/middleware/verifyToken');
const jwt = require('jsonwebtoken');

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

  app.get('/profile/:userId/:token', (req, res) => {
    jwt.verify(req.token, 'secret', (err, tokenData) => {
      if (err || tokenData.user.id.toString() !== req.params.userId) {
        console.log('token doesnt match usesr id');
        res.sendStatus(403);
      } else {
        console.log('token matched --> redirecting...');
        res.sendFile(path.join(__dirname, '../public/html/profile.html'));
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
