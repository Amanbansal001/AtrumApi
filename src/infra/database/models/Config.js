'use strict';

module.exports = function (sequelize, DataTypes) {
  const Config = sequelize.define('configs', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    col: { type: DataTypes.STRING },
    val: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, default: Date.now },
    updatedAt: { type: DataTypes.DATE, default: Date.now },
  });

  return Config;
};
