module.exports = (app, db, passport) => {
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
