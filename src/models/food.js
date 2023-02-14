// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define(
    "Food",
    {
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Group: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      calories: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      carbs: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      fat: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      protein: {
        type: DataTypes.STRING,
        // allowNull: false,
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
        // allowNull: false,
      },
    });
  };

  return Food;
};
