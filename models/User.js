// import Model class and DataTypes object from sequelize
const { Model, DataTypes } = require('sequelize');
// Sequelize connection to the database
const sequelize = require('../config/connection');

// create User model
class User extends Model {}

// define table columns and configurations
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // must have a value
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      //username cannot be duplicated
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // is email format email@service.com
        isEmail: true,
      },
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    //pass our imported sequelize connection
    sequelize,
    // false: don't automatically create
    // true: automatically create
    timestamps: false,
    //don't pluralize name of db tables
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;