const verifyToken = require('../config/middleware/verifyToken');

module.exports = (app, path, jwt) => {
  // index
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

  app.get('/dashboard/:userId/:token', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, tokenData) => {
      // check to see if user is not an id
      if (
        req.params.userId === 'styles' ||
        req.params.userId === 'scripts' ||
        req.params.userId === 'images'
      ) {
        // send the requested file
        res.sendFile(path.join(__dirname, `../public/${req.params.userId}/${req.token}`));
      }

      // check for token id and user id mismatch
      else if (err || tokenData.user.id.toString() !== req.params.userId) {
        res.sendFile(path.join(__dirname, '../public/html/401.html'));
      }

      // all checks past, send the html file
      else {
        res.sendFile(path.join(__dirname, '../public/html/dashboard.html'));
      }
    });
  });

  app.get('/overview/:userId/:token', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, tokenData) => {
      // check to see if user is not an id
      if (
        req.params.userId === 'styles' ||
        req.params.userId === 'scripts' ||
        req.params.userId === 'images'
      ) {
        // send the requested file
        res.sendFile(path.join(__dirname, `../public/${req.params.userId}/${req.token}`));
      }

      // check for token id and user id mismatch
      else if (err || tokenData.user.id.toString() !== req.params.userId) {
        res.sendFile(path.join(__dirname, '../public/html/401.html'));
      }

      // all checks past, send the html file
      else {
        res.sendFile(path.join(__dirname, '../public/html/overview.html'));
      }
    });
  });

  app.get('/expenses/:userId/:token', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, tokenData) => {
      // check to see if user is not an id
      if (
        req.params.userId === 'styles' ||
        req.params.userId === 'scripts' ||
        req.params.userId === 'images'
      ) {
        // send the requested file
        res.sendFile(path.join(__dirname, `../public/${req.params.userId}/${req.token}`));
      }

      // check for token id and user id mismatch
      else if (err || tokenData.user.id.toString() !== req.params.userId) {
        res.sendFile(path.join(__dirname, '../public/html/401.html'));
      }

      // all checks past, send the html file
      else {
        res.sendFile(path.join(__dirname, '../public/html/expenses.html'));
      }
    });
  });

  app.get('/profile/:userId/:token', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, tokenData) => {
      // check to see if user is not an id
      if (
        req.params.userId === 'styles' ||
        req.params.userId === 'scripts' ||
        req.params.userId === 'images'
      ) {
        // send the requested file
        res.sendFile(path.join(__dirname, `../public/${req.params.userId}/${req.token}`));
      }

      // check for token id and user id mismatch
      else if (err || tokenData.user.id.toString() !== req.params.userId) {
        res.sendFile(path.join(__dirname, '../public/html/401.html'));
      }

      // all checks past, send the html file
      else {
        res.sendFile(path.join(__dirname, '../public/html/profile.html'));
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/404.html'));
  });
};
