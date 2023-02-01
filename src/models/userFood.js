// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserFood = sequelize.define(
    "UserFood",
    {
      serving: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dailyMeal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      data: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );

  UserFood.associate = (db) => {
    UserFood.belongsTo(db.ProfileUser, {
      foreignKey: {
        name: "profileUserId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    UserFood.belongsTo(db.Food, {
      foreignKey: {
        name: "foodId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return UserFood;
};
