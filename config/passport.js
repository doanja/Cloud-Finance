const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");

module.exports = function(passport, db) {
  // for sigining up new user
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
        const hashPassword = function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        // check to see if user already exists
        db.User.findOne({
          where: {
            email
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
            const hashedPassword = hashPassword(password);
            const { firstName, lastName } = req.body;

            // create a new user object
            const newUser = {
              email,
              password: hashedPassword,
              firstName,
              lastName
            };

            // use sequelize to create the new user passing in the newUser object
            db.User.create(newUser).then(function(newUser, created) {
              console.log("newUser", newUser);
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

  // strategy for logging in
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        const isValidPassword = function(userpass, password) {
          return bcrypt.compareSync(password, userpass);
        };

        db.User.findOne({
          where: {
            email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );

  //serialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {
    db.User.findOne({
      where: {
        id
      }
    }).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
