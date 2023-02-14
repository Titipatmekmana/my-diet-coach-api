// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserFood = sequelize.define(
    "UserFood",
    {
      serving: {
        type: DataTypes.STRING,
      },
      dailyMeal: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      date: {
        type: DataTypes.STRING,
        // allowNull: false,
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
        // allowNull: false,
      },
    });

    UserFood.belongsTo(db.Food, {
      foreignKey: {
        name: "foodId",
        // allowNull: false,
      },
    });
  };

  return UserFood;
};
