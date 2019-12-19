var db = require("../models");

module.exports = function(app) {
  // get all the Category's (with expenses) belonging to the user's id (from req.params.id)
  app.get("/api/category/all/:id", (req, res) => {
    db.Category.findAll({
      include: [db.Expense],
      where: { UserId: req.params.id }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // get all catergories and their goals belonging to the user
  app.get("/api/category/:id", (req, res) => {
    db.Category.findAll({ where: { UserId: req.params.id } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // create a single Category and goal
  app.post("/api/category/:id", (req, res) => {
    const { name, goal } = req.body;
    const { id } = req.params;

    db.Category.create({
      name,
      goal,
      UserId: id
    })
      .then(newCategory => {
        res.status(200).json(newCategory);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  // update a single Category and its goal
  app.put("/api/category/", (req, res) => {
    const { name, goal, id } = req.body;

    db.Category.update(
      {
        name,
        goal
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

  // delete a single Category, its goal, and associated transactions by id
  app.delete("/api/category/:id", (req, res) => {
    db.Category.destroy({
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
