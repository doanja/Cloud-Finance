// var bcrypt = require("bcryptjs");

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
      validate: { len: [10, 30] }
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

  /* Creating a custom method for our User model. 
     This will check if an unhashed password entered by the 
     user can be compared to the hashed password stored in our database */
  // User.prototype.validPassword = password => {
  //   return bcrypt.compareSync(password, this.password);
  // };

  // User.beforeCreate(user => {
  //   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  // });

  User.associate = models => {
    User.hasMany(models.Category, {
      onDelete: 'cascade'
    });
  };

  return User;
};
