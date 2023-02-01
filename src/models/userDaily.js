// const { DataTypes } = require("sequelize");
// const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const UserDaily = sequelize.define(
    "UserDaily",
    {
      kcalLeft: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carbLeft: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fatLeft: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      proteinLeft: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  UserDaily.associate = (db) => {
    UserDaily.belongsTo(db.ProfileUser, {
      foreignKey: {
        name: "profileUserId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return UserDaily;
};
