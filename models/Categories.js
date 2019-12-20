module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },
    goal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  });

  Category.associate = models => {
    Category.belongsTo(models.User, {
      foreignKey: {
        defaultValue: null
      }
    });
  };

  Category.associate = models => {
    Category.hasMany(models.Expense, {
      onDelete: "cascade"
    });
  };

  return Category;
};
