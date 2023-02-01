// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const AdminId = sequelize.define(
    "AdminId",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
          notEmpty: true,
        },
        age: {
          type: DataTypes.STRING,
        },
        gender: {
          type: DataTypes.ENUM("MALE", "FEMALE"),
        },
        updateFood: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
  return AdminId;
};
