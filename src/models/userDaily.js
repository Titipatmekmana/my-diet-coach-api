// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserDaily = sequelize.define(
    "UserDaily",
    {
      kcalLeft: {
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
          notEmpty: true,
        },
        carbLeft: {
          type: DataTypes.DATE,
        },
        fatLeft: {
          type: DataTypes.DATE,
        },
        fatLeft: {
          type: DataTypes.DATE,
        },
        proteinLeft: {
          type: DataTypes.DATE,
        },
        Date: {
          type: DataTypes.DATE,
        },
      },
    },
    {
      underscored: true,
    }
  );
  return UserDaily;
};
