/* Requiring bcrypt for password hashing. Using the bcryptjs version as 
   the regular bcrypt module sometimes causes errors on Windows machines */
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 6 }
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
    // last_login: {
    //   type: DataTypes.DATE
    // },
    // status: {
    //   type: DataTypes.ENUM("active", "inactive"),
    //   defaultValue: "active"
    // }
  });

  /* Creating a custom method for our User model. 
     This will check if an unhashed password entered by the 
     user can be compared to the hashed password stored in our database */
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.pwd);
  };

  User.beforeCreate(user => {
    user.pwd = bcrypt.hashSync(user.pwd, bcrypt.genSaltSync(10), null);
  });

  User.associate = models => {
    User.hasMany(models.Category, {
      onDelete: "cascade"
    });
  };

  return User;
};
