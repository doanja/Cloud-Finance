module.exports = (app, db, joi) => {
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

  // post route for bulk creating expenses from a csv file
  app.post('/api/expense/csv', (req, res) => {
    const { id, data } = req.body;

    // check to see if N/A category already exists
    db.Category.findOne({
      where: {
        [db.Op.and]: [{ name: 'N/A' }, { UserId: id }]
        // name: 'N/A'
        // // UserId: id
      }
    })
      .then(category => {
        // 'N/A' category was found
        if (category) {
          console.log('CATEGORY FOUND ###################################');
          // get the new CategoryId
          const CategoryId = category.id;

          // add the CategoryId to each row
          data.forEach(row => {
            row.CategoryId = CategoryId;
            console.log('row :', row);
          });

          // create expense using the csv
          db.Expense.bulkCreate(data)
            .then(newExpense => {
              res.status(200).json(newExpense);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json({ error: err });
            });
        }
        // 'N/A' category was not found, so one is created
        else {
          console.log('CATEGORY NOT FOUND ###################################');
          console.log('id:', id);
          // use sequelize to create the new user passing in the newUser object
          db.Category.create({
            name: 'N/A',
            goal: 0,
            UserId: id
          }).then(newCategory => {
            // get the new CategoryId
            const CategoryId = newCategory.id;

            // add the CategoryId to each row
            data.forEach(row => {
              row.CategoryId = CategoryId;
              console.log('row :', row);
            });

            // create expense using the csv
            db.Expense.bulkCreate(data)
              .then(newExpense => {
                res.status(200).json(newExpense);
              })
              .catch(err => {
                console.log(err);
                res.status(400).json({ error: err });
              });
          });
        }
      })
      .catch(err => {
        res.status(400).json({ error: err });
      });

    // // create a new category (temp category for the new rows)
    // db.Category.create({
    //   name: 'N/A',
    //   goal: 0,
    //   UserId: id
    // })
    //   .then(newCategory => {
    //     // get the new CategoryId
    //     const CategoryId = newCategory.id;

    //     // add the CategoryId to each row
    //     data.forEach(row => {
    //       row.CategoryId = CategoryId;
    //     });

    //     //   // create expense using the csv
    //     //   db.Expense.bulkCreate(data)
    //     //     .then(newExpense => {
    //     //       res.status(200).json(newExpense);
    //     //     })
    //     //     .catch(err => {
    //     //       console.log(err);
    //     //       res.status(400).json({ error: err });
    //     //     });
    //   })
    //   .catch(err => {
    //     res.status(400).json({ error: err });
    //   });
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
