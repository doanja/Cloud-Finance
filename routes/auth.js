const jwt = require('jsonwebtoken');

module.exports = (app, path, passport) => {
  app.get('/signup', (req, res) => {
    // redirect user to dashboard if they're already logged in
    if (req.user) {
      res.redirect('/dashboard/' + req.user.id);
    }
    res.sendFile(path.join(__dirname, '../public/html/signup.html'));
  });

  app.get('/login', (req, res) => {
    // redirect user to dashboard if they're already logged in
    if (req.user) {
      res.redirect('/dashboard/' + req.user.id);
    }
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
  });

  // used for login failures
  app.get('/login/err', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login-failed.html'));
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/login',
      failureRedirect: '/signup'
    })
  );

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', { session: false }, (err, user, info) => {
      console.log('user :', user);
      if (!user || err) {
        return res.redirect(403, '/login/err');
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        jwt.sign({ user }, 'secret', (err, token) => {
          return res.json({ user, token });
        });
      });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
};
