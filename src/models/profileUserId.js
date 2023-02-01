// const { DataTypes } = require("sequelize");
// const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ProfileUserId = sequelize.define(
    "ProfileUserId",
    {
      loseWeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gainWeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nuttrtionForUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carbs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      protein: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("MALE", "FEMALE"),
      },
    },
    {
      underscored: true,
    }
  );
  //  User.asscocite = db => {
  //   User.hasMany(db.)
  //  }

  return ProfileUserId;
};
