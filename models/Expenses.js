module.exports = function(sequelize, DataTypes) {
  const Expense = sequelize.define("Expense", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 50] }
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0
    }
  });

  Expense.associate = models => {
    Expense.belongsTo(models.Category, {
      foreignKey: {
        defaultValue: null
      }
    });
  };

  return Expense;
};
