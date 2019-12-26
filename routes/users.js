const Joi = require('@hapi/joi');

module.exports = (app, db) => {
  // get all the user's info
  app.get('/api/user/:id', (req, res) => {
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

  // create a single user
  app.post('/api/user', (req, res) => {
    const { firstName, lastName, username, password, email, income } = req.body;

    // define joi schema
    const schema = Joi.object({
      firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
      lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
      password: Joi.string().pattern(new RegExp(/^.{10,30}$/)),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
    });

    // compare schema with req.body
    const validate = schema.validate(req.body);

    // if there are errors, send them
    if (validate.error) {
      res.status(400).send(validate.error.details[0].message);
      return;
    }

    db.User.create({
      firstName,
      lastName,
      username,
      password,
      email,
      income
    })
      .then(newUser => {
        res.status(200).json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // update a single user
  app.put('/api/user/:id', (req, res) => {
    const { firstName, lastName } = req.body;

    // define joi schema
    const schema = Joi.object({
      firstName: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
      lastName: Joi.string()
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

    // TODO: needs validation for updated fields on front end
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
  app.put('/api/user/income/:id', (req, res) => {
    const { income } = req.body;

    // TODO: needs validation for updated fields on front end
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
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // delete a single user
  app.delete('/api/user/:id', (req, res) => {
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
};
