const bcrypt = require('bcrypt-nodejs');

module.exports = (app, db, joi, passport) => {
  // get all the user's info
  app.get('/api/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.User.findOne({
      where: { id: req.params.id }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // update a single user
  app.put('/api/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { firstName, lastName } = req.body;

    // define joi schema
    const schema = joi.object({
      firstName: joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
      lastName: joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .required()
    });

    // compare schema with req.body
    const validate = schema.validate(req.body);

    // if there are errors, send them
    if (validate.error) {
      res.status(400).send(validate.error.details[0].message);
      return;
    }

    db.User.update(
      {
        firstName,
        lastName
      },
      {
        where: { id: req.params.id }
      }
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // update a single user's income
  app.put('/api/user/income/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { income } = req.body;

    // define joi schema
    const schema = joi.object({
      income: joi
        .number()
        .positive()
        .max(99999999)
        .required()
    });

    // compare schema with req.body
    const validate = schema.validate(req.body);

    // if there are errors, send them
    if (validate.error) {
      res.status(400).send(validate.error.details[0].message);
      return;
    }

    db.User.update({ income }, { where: { id: req.params.id } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  });

  // delete a single user (not used)
  app.delete('/api/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.User.destroy({
      where: { id: req.params.id }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // returns the user's income and remainder (total expenses across all categories)
  app.get('/api/remainder/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;

    db.sequelize
      .query(
        `SELECT 
          u.income, 
          sum(amount) AS remainder 
        FROM Users AS u 
          LEFT JOIN Categories AS cat ON cat.UserID = u.id 
          LEFT JOIN Expenses AS exp ON exp.CategoryId = cat.id 
        WHERE u.id = ${id}`,
        { type: db.sequelize.QueryTypes.SELECT, where: { id } }
      )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // get all the user's info
  app.post(
    '/api/user/:id',
    /* passport.authenticate('jwt', { session: false }),*/ (req, res) => {
      const { password, newPassword } = req.body;

      // define joi schema
      const schema = joi.object({
        newPassword: joi
          .string()
          .min(10)
          .max(100)
          .required()
      });

      // compare schema with req.body
      const validate = schema.validate({ newPassword });

      // if there are errors, send them
      if (validate.error) {
        res.status(400).send(validate.error.details[0].message);
        return;
      }

      /**
       * function to generate hash password
       * @param {string} password the user's password
       * @return {string} the user's new encrypted password
       */
      const hashPassword = password => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      };

      /**
       * function to check the hashed password with the user's entered password
       * @param {string} hashedPassword the user's password from the database (hashed)
       * @param {string} enteredPassword the user's new password from the database (unhashed)
       * @return {boolean} true if password matches, false otherwise
       */
      const isValidPassword = (hashedPassword, enteredPassword) => {
        return bcrypt.compareSync(enteredPassword, hashedPassword);
      };

      db.User.findOne({
        where: { id: req.params.id }
      })
        .then(userData => {
          if (!isValidPassword(userData.password, password)) {
            res.status(400).json({ error: 'Incorrect password detected' });
          } else {
            db.User.update(
              { password: hashPassword(newPassword) },
              { where: { id: req.params.id } }
            )
              .then(data => {
                res.status(200).json({ msg: 'Password update success' });
              })
              .catch(err => {
                res.status(400).json({ error: err });
              });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ error: err });
        });
    }
  );
};
