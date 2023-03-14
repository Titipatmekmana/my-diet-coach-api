const { allow } = require("joi");
const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const UserWorkout = sequelize.define("UserWorkout", {
    time: {
      type: DataTypes.STRING,
      allowNUll: true,
    },
  });

  UserWorkout.associate = (db) => {
    UserWorkout.belongsTo(db.ProfileUser, {
      foreignKey: {
        name: "profileUserId",
        // allowNull: false,
      },
    });

    UserWorkout.belongsTo(db.Workout, {
      foreignKey: {
        name: "workoutId",
        // allowNull: false,
      },
    });
  };
  return UserWorkout;
};
