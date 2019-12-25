module.exports = (app, db) => {
  // get all the Category's (with expenses) belonging to the user's id
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

  // get all catergories belonging to the user
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

  // create a single category
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

  // update a single Category
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

  // delete a single Category
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
