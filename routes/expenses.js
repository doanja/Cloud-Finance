const db = require("../models");

module.exports = function(app) {
  // get all expenses belonging to the category
  app.get("/api/expense/:id", (req, res) => {
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
  app.post("/api/expense/", (req, res) => {
    const { amount, description, date, CategoryId } = req.body;

    // const errors = [];

    // if (!amount || !description || !date || !CategoryId) {
    //   errors.push({ msg: "Fill in all required fields..." });
    // }

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
  app.put("/api/expense/:id", (req, res) => {
    let { amount, description, date, CategoryId } = req.body;
    const { id } = req.params;

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
  app.delete("/api/expense/:id", (req, res) => {
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
