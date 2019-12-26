module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 20] }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [2, 20] }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [10, 100] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    income: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  });

  User.associate = models => {
    User.hasMany(models.Category, {
      onDelete: 'cascade'
    });
  };

  return User;
};
