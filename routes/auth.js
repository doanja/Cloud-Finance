module.exports = function(app, path, passport) {
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

  app.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.redirect('/dashboard/' + req.user.id);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
};
