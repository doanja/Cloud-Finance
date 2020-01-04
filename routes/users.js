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
    console.log('income :', income);
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

    db.User.update(
      {
        income
      },
      {
        where: { id: req.params.id }
      }
    )
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
};
