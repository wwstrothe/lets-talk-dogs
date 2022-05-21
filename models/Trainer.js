const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Trainer extends Model {}

Trainer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // must have a value
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trainer_feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    dog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'dog',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "trainer",
  }
);

module.exports = Trainer