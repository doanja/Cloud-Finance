const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport, db) => {
  // for sigining up new user
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      // required callback function
      (req, email, password, done) => {
        // function to generate hash password
        const hashPassword = password => {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        // check to see if user already exists
        db.User.findOne({
          where: {
            email
          }
        }).then(user => {
          // if an email was found already --> means email is used by someone
          if (user) {
            return done(null, false, {
              message: 'That email is already taken'
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
            db.User.create(newUser).then((newUser, created) => {
              // unsuccessful in creating user
              if (!newUser) {
                return done(null, false, {
                  message: 'Unsuccessful in creating new user'
                });
              }
              // new user created successfully
              if (newUser) {
                return done(null, newUser, {
                  message: 'User created successfully'
                });
              }
            });
          }
        });
      }
    )
  );

  // strategy for logging in
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        const isValidPassword = (hashedPassword, enteredPassword) => {
          return bcrypt.compareSync(enteredPassword, hashedPassword);
        };

        db.User.findOne({
          where: {
            email
          }
        })
          .then(user => {
            if (!user) {
              return done(null, false, {
                message: 'Email does not exist'
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: 'Incorrect password.'
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(err => {
            console.log('Error:', err);

            return done(null, false, {
              message: 'Something went wrong with your Signin'
            });
          });
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret',
        passReqToCallback: true
      },
      (req, jwtPayload, done) => {
        // if the token id does not match the
        if (req.params.id !== jwtPayload.user.id.toString()) {
          return done(null, false, {
            message: 'Token id mismatch'
          });
        }
        // otherwise confirm the token.id exists in the Users table
        else {
          return db.User.findOne({
            where: {
              id: jwtPayload.user.id
            }
          })
            .then(user => {
              return done(null, user);
            })
            .catch(err => {
              console.log('Error:', err);

              return done(null, false, {
                message: 'Something went wrong with your authorization token'
              });
            });
        }
      }
    )
  );
};
