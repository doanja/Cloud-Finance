const Joi = require('@hapi/joi');

module.exports = (app, db) => {
  // get all expenses belonging to the category
  app.get('/api/expense/:id', (req, res) => {
    db.Expense.findAll({ where: { CategoryId: req.params.id } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // create a single expense
  app.post('/api/expense/', (req, res) => {
    const { amount, description, date, CategoryId } = req.body;

    // define joi schema
    const schema = Joi.object({
      description: Joi.string()
        .min(1)
        .max(50)
        .required(),
      amount: Joi.number()
        .positive()
        .max(999999999)
        .required(),

      date: Joi.date().required(),
      CategoryId: Joi.number()
        .integer()
        .required()
    });

    // compare schema with req.body
    const validate = schema.validate(req.body);

    // if there are errors, send them
    if (validate.error) {
      res.status(400).send(validate.error.details[0].message);
      return;
    }
    db.Expense.create({
      amount,
      description,
      date,
      CategoryId
    })
      .then(newExpense => {
        res.status(200).json(newExpense);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // update a single Expense
  app.put('/api/expense/:id', (req, res) => {
    const { amount, description, date, CategoryId } = req.body;
    const { id } = req.params;

    // define joi schema
    const schema = Joi.object({
      description: Joi.string()
        .min(1)
        .max(50)
        .required(),
      amount: Joi.number()
        .positive()
        .max(999999999)
        .required(),
      date: Joi.date().required(),
      CategoryId: Joi.number()
        .integer()
        .required()
    });

    // compare schema with req.body
    const validate = schema.validate(req.body);

    // if there are errors, send them
    if (validate.error) {
      res.status(400).send(validate.error.details[0].message);
      return;
    }

    db.Expense.update(
      {
        amount,
        description,
        date,
        CategoryId
      },
      {
        where: { id }
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

  // delete a single expense
  app.delete('/api/expense/:id', (req, res) => {
    db.Expense.destroy({
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
