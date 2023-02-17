// const { DataTypes } = require("sequelize");
// const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ProfileUser = sequelize.define(
    "ProfileUser",
    {
      loseWeight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gainWeight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nuttrtionForUser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calories: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      carbs: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      protein: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  ProfileUser.associate = (db) => {
    ProfileUser.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
      },
    });

    ProfileUser.hasMany(db.UserDaily, {
      foreignKey: {
        name: "userDailyId",
      },
    });

    ProfileUser.hasMany(db.UserFood, {
      foreignKey: {
        name: "profileUserId",
      },
    });

    ProfileUser.hasMany(db.Workout, {
      foreignKey: {
        name: "profileUserId",
      },
    });
  };

  return ProfileUser;
};
