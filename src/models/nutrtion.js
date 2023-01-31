const { DataTypes } = require("sequelize");
const { sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Nutrtion = sequelize.define("Nutrtion", {}, { underscored: true });
};
