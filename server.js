require('dotenv').config();
const express = require('express');
const path = require('path');
const joi = require('@hapi/joi'); // for validation
const jwt = require('jsonwebtoken'); // for tokens
const db = require('./models');

// Passport
const passport = require('passport');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Passport
app.use(session({ secret: 'test', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/middleware/passport')(passport, db);

// Routes
require('./routes/auth')(app, path, passport, jwt);
require('./routes/users')(app, db, joi);
require('./routes/remainder')(app, db);
require('./routes/categories')(app, db, joi);
require('./routes/expenses')(app, db, joi, passport);
require('./routes/html')(app, path, passport);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}. Visit http://localhost:${PORT}/`)
  );
});

module.exports = app;
