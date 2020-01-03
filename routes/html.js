const isLoggedIn = require('../config/middleware/isLoggedIn');

// Verify Token
function verifyToken(req, res, next) {
  console.log('req.headers :', req.headers);
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

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

  app.get('/overview/:userId', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/overview.html'));
  });

  app.get('/expenses/:userId', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/expenses.html'));
  });

  app.get('/profile/:userId', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/profile.html'));
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
