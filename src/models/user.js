const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        mobile: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            is: /^[0-9]{10}$/,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birthdate: {
          type: DataTypes.DATETIME,
        },
      },
    },
    {
      underscored: true,
    }
  );
  return User;
};
