module.exports = (app, db, joi) => {
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
    const schema = joi.object({
      description: joi
        .string()
        .min(1)
        .max(50)
        .required(),
      amount: joi
        .number()
        .positive()
        .max(999999999)
        .required(),
      date: joi.date().required(),
      CategoryId: joi
        .number()
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

  app.post('/api/expense/csv', (req, res) => {
    // TODO: check if there is a 'none' category, else create 'none' category
    // for each row from req.body, create a new expense
    const { data } = req.body;

    // create a new category
    db.Category.create({
      name,
      goal,
      UserId: id
    })
      .then(newCategory => {
        data.forEach(row => {
          console.log('row :', row);
          // call create here
          res.status(200).json(newCategory);
        });
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });
  });

  // update a single Expense
  app.put('/api/expense/:id', (req, res) => {
    const { amount, description, date, CategoryId } = req.body;
    const { id } = req.params;

    // define joi schema
    const schema = joi.object({
      description: joi
        .string()
        .min(1)
        .max(50)
        .required(),
      amount: joi
        .number()
        .positive()
        .max(999999999)
        .required(),
      date: joi.date().required(),
      CategoryId: joi
        .number()
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
