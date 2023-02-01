// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserFoodId = sequelize.define(
    "UserFoodId",
    {
      serving: {
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
          notEmpty: true,
        },
        dailyMeal: {
          type: DataTypes.STRING,
          allowNull: false,
          validator: {
            notEmpty: true,
          },
        },
        data: {
          type: DataTypes.DATE,
        },
      },
    },
    {
      underscored: true,
    }
  );
  return UserFoodId;
};
