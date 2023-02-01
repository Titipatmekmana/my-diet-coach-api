// const { DataTypes } = require("sequelize");
// const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ProfileUser = sequelize.define(
    "ProfileUser",
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
  ProfileUser.associate = (db) => {
    ProfileUser.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    ProfileUser.hasMany(db.UserDaily, {
      foreignKey: {
        name: "userDailyId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    ProfileUser.hasMany(db.UserFood, {
      foreignKey: {
        name: "profileUserId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ProfileUser;
};
