require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./models');

// Passport
const passport = require('passport');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Passport
app.use(session({ secret: 'test', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/middleware/passport')(passport, db);

// Routes
require('./routes/auth')(app, path, passport);
require('./routes/users')(app, db);
require('./routes/remainder')(app, db);
require('./routes/categories')(app, db);
require('./routes/expenses')(app, db);
require('./routes/html')(app, path);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}. Visit http://localhost:${PORT}/`)
  );
});

module.exports = app;
