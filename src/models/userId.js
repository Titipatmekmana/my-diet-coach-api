// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserId = sequelize.define(
    "UserId",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );

  return UserId;
};
