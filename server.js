require('dotenv').config();
const express = require('express');
const path = require('path');

/* Testing Passport */
const passport = require('passport');
var session = require('express-session');
/* Testing Passport */

const db = require('./models');
const app = express();
const PORT = process.env.PORT || 5000;
const syncOptions = { force: false };

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

/* Testing Passport */
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport, db);
/* Testing Passport */

// Routes
require('./routes/auth')(app, passport);
require('./routes/users')(app, db);
require('./routes/remainder')(app, db);
require('./routes/categories')(app, db);
require('./routes/expenses')(app, db);
require('./routes/html')(app, path);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () =>
    console.log(
      `Server started on port ${PORT}. Visit http://localhost:${PORT}/`
    )
  );
});

module.exports = app;
