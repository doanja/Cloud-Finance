const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");

module.exports = function(passport) {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      // required callback function
      function(req, email, password, done) {
        // function to generate hash password
        const generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        // check to see if user already exists
        db.User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          // if an email was found already --> means email is used by someone
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          }
          // no user was found --> create a new user
          else {
            const hashedPassword = generateHash(password);

            // create a new user object
            const newUser = {
              email: email,
              password: hashedPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            // use sequelize to create the new user passing in the newUser object
            db.User.create(newUser).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
};
