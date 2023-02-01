// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define(
    "Food",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Group: {
        type: DataTypes.STRING,
      },
      calories: {
        type: DataTypes.STRING,
        unique: true,
      },
      carbs: {
        type: DataTypes.STRING,
      },
      fat: {
        type: DataTypes.STRING,
      },
      protein: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Food.associate = (db) => {
    Food.hasMany(db.UserFood, {
      foreignKey: {
        name: "foodId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Food;
};
